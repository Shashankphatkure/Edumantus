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

    if (paymentData.status === 'CHARGED') {
      // Parse the order_id to get the booking ID
      // Format: ORDER_timestamp_userId_bookingId
      const orderId = paymentData.order_id;
      const orderParts = orderId.split('_');
      
      // Make sure we have enough parts
      if (orderParts.length < 4) {
        console.error('Invalid order_id format:', orderId);
        throw new Error('Invalid order_id format');
      }

      const bookingId = orderParts[3]; // Get booking ID
      console.log('Looking for booking ID:', bookingId);

      try {
        // Find the specific booking using the booking ID
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

        console.log('Found pending booking:', existingBooking);

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
        
        return NextResponse.redirect(new URL('/payment/success', process.env.NEXT_PUBLIC_APP_URL), {
          status: 303
        });
      } catch (dbError) {
        console.error('Database Error Details:', dbError);
        return NextResponse.redirect(new URL('/payment/error', process.env.NEXT_PUBLIC_APP_URL), {
          status: 303
        });
      }
    } else {
      console.log('Payment status not CHARGED:', paymentData.status);
      return NextResponse.redirect(new URL('/payment/failure', process.env.NEXT_PUBLIC_APP_URL), {
        status: 303
      });
    }
  } catch (error) {
    console.error('Webhook Error Details:', error);
    console.error('Error Stack:', error.stack);
    return NextResponse.redirect(new URL('/payment/error', process.env.NEXT_PUBLIC_APP_URL), {
      status: 303
    });
  }
}