import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // Get the authenticated user first
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error('Auth error:', authError);
      throw new Error('User not authenticated');
    }

    // Parse the request body
    const requestData = await request.json();
    console.log('Received request data:', requestData); // Debug log

    // Extract data from the correct locations
    const expertId = requestData.metadata?.expertId;
    const bookingDate = requestData.metadata?.bookingDate;
    const bookingTime = requestData.metadata?.bookingTime;
    const amount = requestData.amount;

    // Validate required fields
    if (!expertId || !bookingDate || !bookingTime || !amount) {
      throw new Error('Missing required fields: expertId, bookingDate, bookingTime, or amount');
    }

    // Convert expertId to number if it's a string
    const expert_id = typeof expertId === 'string' ? parseInt(expertId, 10) : expertId;
    
    // Create a pending booking first
    const bookingData = {
      user_id: user.id,
      expert_id: expert_id,
      booking_date: bookingDate,
      booking_time: bookingTime,
      status: 'pending',
      payment_status: 'pending',
      amount: parseFloat(amount),
      notes: 'Booking initiated'
    };

    console.log('Creating booking with data:', bookingData); // Debug log

    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select()
      .single();

    if (bookingError) {
      console.error('Booking error:', bookingError);
      throw bookingError;
    }

    // Create payment request with booking reference
    const paymentRequest = {
      order_id: `ORDER_${Date.now()}_${user.id}_${booking.id}`,
      amount: amount.toString(),
      currency: 'INR',
      customer_id: user.id,
      customer_email: requestData.userEmail || user.email,
      customer_phone: requestData.userPhone || '',
      payment_page_client_id: process.env.HDFC_MERCHANT_ID,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment-callback`,
      action: 'paymentPage',
      webhook_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment-webhook`,
      webhook_params: [
        'order_id',
        'payment_status',
        'merchant_transaction_id',
        'payment_instrument',
        'transaction_date',
        'hash',
        'metadata'
      ],
      description: requestData.description || `Consultation booking #${booking.id}`,
      first_name: requestData.firstName || '',
      last_name: requestData.lastName || '',
      payment_filter: {
        allowDefaultOptions: true,
        options: [
          { paymentMethodType: 'UPI', enable: true },
          { paymentMethodType: 'CARD', enable: true },
          { paymentMethodType: 'NB', enable: true },
          { paymentMethodType: 'WALLET', enable: true }
        ]
      },
      metadata: {
        bookingId: booking.id,
        ...requestData.metadata
      },
      source_object: 'PAYMENT_LINK'
    };

    console.log('Payment Request:', paymentRequest); // Debug log

    // Create base64 encoded API key
    const apiKeyBase64 = btoa(`${process.env.HDFC_API_KEY}:`);

    // Make request to HDFC payment gateway
    const response = await fetch('https://smartgatewayuat.hdfcbank.com/session', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${apiKeyBase64}`,
        'x-merchantid': process.env.HDFC_MERCHANT_ID,
        'x-customerid': user.id,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentRequest)
    });

    if (!response.ok) {
      console.error('Gateway Error:', response.status, await response.text());
      throw new Error(`Gateway returned ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Gateway Response:', responseData); // Debug log

    if (!responseData || !responseData.payment_links) {
      throw new Error('Invalid response from gateway');
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      error: error.message,
      details: error.details || null 
    }, { status: 500 });
  }
}

// Add this new GET handler
export async function GET(request) {
  try {
    // Get the URL from the request
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const responseData = Object.fromEntries(searchParams.entries());
    
    console.log('Payment Callback Received:', responseData); // Debug log
    
    // Instead of returning JSON, redirect to a success or failure page
    const status = responseData.status;
    const redirectUrl = status === 'CHARGED' 
      ? '/payment/success'
      : '/payment/failure';
    
    return NextResponse.redirect(new URL(redirectUrl, process.env.NEXT_PUBLIC_APP_URL));
  } catch (error) {
    console.error('Payment Callback Error:', error);
    // Redirect to error page instead of returning JSON
    return NextResponse.redirect(new URL('/payment/error', process.env.NEXT_PUBLIC_APP_URL));
  }
}
