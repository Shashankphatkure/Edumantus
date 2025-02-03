import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

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
    console.log('Looking for booking ID:', bookingId);

    try {
      // Find and update the booking
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

      // Update the booking
      const { data: booking, error: updateError } = await supabase
        .from('bookings')
        .update({
          payment_status: 'completed',
          status: 'confirmed',
          transaction_id: orderId,
          payment_mode: 'online',
          payment_time: new Date().toISOString(),
          notes: `Payment completed with status: ${paymentData.status}`
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