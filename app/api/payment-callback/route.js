import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import crypto from 'crypto';

// Same hash function as in create-payment-session
function generatePaymentHash(bookingId, amount, userId) {
  const secret = process.env.PAYMENT_HASH_SECRET || 'your-secret-key-change-this';
  const dataToHash = `${bookingId}:${amount}:${userId}:${secret}`;
  return crypto.createHash('sha256').update(dataToHash).digest('hex');
}

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    const formData = await request.formData();
    const paymentData = Object.fromEntries(formData.entries());
    
    console.log('Payment Callback Received:', paymentData);

    // Get the base URL from environment variable or construct from request
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
                   (request.headers.get('host') ? 
                    `${request.headers.get('x-forwarded-proto') || 'http'}://${request.headers.get('host')}` : 
                    'http://localhost:3000');

    if (paymentData.status !== 'CHARGED') {
      console.log('Payment status not CHARGED:', paymentData.status);
      
      // Construct failure URL with encoded orderId
      const failureUrl = new URL('/payment/failure', baseUrl);
      failureUrl.searchParams.set('orderId', paymentData.order_id);
      
      console.log('Redirecting to:', failureUrl.toString());
      return NextResponse.redirect(failureUrl.toString(), {
        status: 303
      });
    }

    // Parse the order_id to get the booking ID
    const orderId = paymentData.order_id;
    const orderParts = orderId.split('_');
    
    if (orderParts.length < 4) {
      console.error('Invalid order_id format:', orderId);
      throw new Error('Invalid order_id format');
    }

    const bookingId = orderParts[3];
    const userId = orderParts[2];
    console.log('Looking for booking ID:', bookingId);

    try {
      // Find the booking
      const { data: existingBooking, error: fetchError } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .eq('payment_status', 'pending')
        .single();

      if (fetchError) {
        console.error('Error fetching booking:', fetchError);
        throw fetchError;
      }

      if (!existingBooking) {
        console.error('No pending booking found with ID:', bookingId);
        throw new Error('No pending booking found');
      }
      
      // IMPORTANT: Validate payment amount from callback against original amount in database
      const callbackAmount = parseFloat(paymentData.amount);
      const originalAmount = existingBooking.amount;
      
      // First validation: Direct comparison of amounts
      if (callbackAmount !== originalAmount) {
        console.error('Amount mismatch detected!', {
          original: originalAmount,
          received: callbackAmount,
          booking: existingBooking.id,
          order: orderId
        });
        
        // Update booking with fraud attempt note
        await supabase
          .from('bookings')
          .update({
            payment_status: 'fraud_attempt',
            notes: `SECURITY ALERT: Payment amount mismatch. Expected: ${originalAmount}, Received: ${callbackAmount}`
          })
          .eq('id', bookingId);
        
        // Redirect to error page with fraud parameter
        const errorUrl = new URL('/payment/error', baseUrl);
        errorUrl.searchParams.set('reason', 'amount_mismatch');
        return NextResponse.redirect(errorUrl.toString(), {
          status: 303
        });
      }
      
      // Second validation: Hash verification for extra security
      const receivedHash = paymentData.metadata?.amountHash;
      const storedHash = existingBooking.amount_hash;
      const calculatedHash = generatePaymentHash(bookingId, callbackAmount, userId);
      
      // If we have stored or received hash, verify it
      if ((storedHash || receivedHash) && 
          !(storedHash === calculatedHash || receivedHash === calculatedHash)) {
        console.error('Hash verification failed!', {
          storedHash,
          receivedHash,
          calculatedHash,
          booking: existingBooking.id
        });
        
        // Update booking with fraud attempt note
        await supabase
          .from('bookings')
          .update({
            payment_status: 'fraud_attempt',
            notes: `SECURITY ALERT: Payment hash verification failed.`
          })
          .eq('id', bookingId);
        
        // Redirect to error page with fraud parameter
        const errorUrl = new URL('/payment/error', baseUrl);
        errorUrl.searchParams.set('reason', 'hash_mismatch');
        return NextResponse.redirect(errorUrl.toString(), {
          status: 303
        });
      }

      // Update the booking only if all validations pass
      const { data: booking, error: updateError } = await supabase
        .from('bookings')
        .update({
          payment_status: 'completed',
          status: 'confirmed',
          transaction_id: orderId,
          payment_mode: 'online',
          payment_time: new Date().toISOString(),
          notes: `Payment completed with status: ${paymentData.status}. Amount validated successfully.`
        })
        .eq('id', bookingId)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating booking:', updateError);
        throw updateError;
      }

      console.log('Booking updated successfully:', booking);
      
      // Construct success URL with orderId
      const successUrl = new URL('/payment/success', baseUrl);
      successUrl.searchParams.set('orderId', orderId);
      
      console.log('Redirecting to success:', successUrl.toString());
      return NextResponse.redirect(successUrl.toString(), {
        status: 303
      });

    } catch (dbError) {
      console.error('Database Error Details:', dbError);
      const errorUrl = new URL('/payment/error', baseUrl);
      return NextResponse.redirect(errorUrl.toString(), {
        status: 303
      });
    }
  } catch (error) {
    console.error('Webhook Error Details:', error);
    console.error('Error Stack:', error.stack);
    
    const errorUrl = new URL('/payment/error', baseUrl);
    return NextResponse.redirect(errorUrl.toString(), {
      status: 303
    });
  }
}