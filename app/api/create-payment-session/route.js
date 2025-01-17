import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const requestData = await request.json();
    
    // Create base64 encoded API key
    const apiKeyBase64 = btoa(`${process.env.HDFC_API_KEY}:`);

    const paymentRequest = {
      order_id: requestData.orderId,
      amount: requestData.amount,
      currency: 'INR',
      customer_id: requestData.userId,
      customer_email: requestData.userEmail,
      customer_phone: requestData.userPhone,
      payment_page_client_id: 'hdfcmaster',
      action: 'paymentPage',
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-callback`,
      description: requestData.description,
      first_name: requestData.firstName,
      last_name: requestData.lastName,
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
        expiryInMins: '60'
      },
      source_object: 'PAYMENT_LINK'
    };

    console.log('Payment Request:', paymentRequest); // Debug log

    // Make request to HDFC payment gateway
    const response = await fetch('https://smartgatewayuat.hdfcbank.com/session', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${apiKeyBase64}`,
        'x-merchantid': 'SG1798',
        'x-customerid': requestData.userId,
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
    await logPaymentError(error, 'create-payment-session');
    return NextResponse.json(
      { 
        error: 'Failed to create payment session', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}
