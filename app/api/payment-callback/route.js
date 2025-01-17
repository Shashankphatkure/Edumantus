import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const paymentData = await request.json();

    // Verify payment status
    if (paymentData.payment_status === 'SUCCESS') {
      // Extract booking details from metadata
      const { expertId, bookingDate, bookingTime, expertName } = paymentData.metadata;
      const userId = paymentData.customer_id;

      // Create booking record
      const { data: booking, error } = await supabase
        .from('bookings')
        .insert([{
          user_id: userId,
          expert_id: expertId,
          booking_date: bookingDate,
          booking_time: bookingTime,
          status: 'confirmed',
          amount: paymentData.amount,
          payment_status: 'completed',
          payment_id: paymentData.merchant_transaction_id,
          notes: `Consultation with ${expertName}`
        }])
        .select()
        .single();

      if (error) throw error;

      return NextResponse.json({ success: true, booking });
    }

    return NextResponse.json({ success: false, message: 'Payment not successful' });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}