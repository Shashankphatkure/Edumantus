import { NextResponse } from 'next/server';

function prettyPrintResponse(response) {
  const parsedBody = JSON.parse(response.body);
  
  console.log('\n=== HDFC API Response ===');
  console.log('Status:', response.status, response.statusText);
  console.log('\nOrder Details:');
  console.log('- Order ID:', parsedBody.order_id);
  console.log('- Status:', parsedBody.status);
  console.log('- Amount:', parsedBody.amount, parsedBody.currency);
  console.log('- Transaction ID:', parsedBody.txn_id);
  
  console.log('\nCustomer Details:');
  console.log('- Email:', parsedBody.customer_email);
  console.log('- Phone:', parsedBody.customer_phone || 'Not provided');
  console.log('- Customer ID:', parsedBody.customer_id);
  
  if (parsedBody.card) {
    console.log('\nPayment Details:');
    console.log('- Payment Method:', parsedBody.payment_method);
    console.log('- Card Type:', parsedBody.card.card_type, parsedBody.card.card_brand);
    console.log('- Card Number:', `xxxx-xxxx-xxxx-${parsedBody.card.last_four_digits}`);
    console.log('- Card Issuer:', parsedBody.card.card_issuer);
  }

  if (parsedBody.payment_gateway_response) {
    console.log('\nGateway Response:');
    console.log('- Response Code:', parsedBody.payment_gateway_response.resp_code);
    console.log('- Response Message:', parsedBody.payment_gateway_response.resp_message);
    console.log('- RRN:', parsedBody.payment_gateway_response.rrn);
    console.log('- EPG Transaction ID:', parsedBody.payment_gateway_response.epg_txn_id);
  }

  console.log('\nTimestamps:');
  console.log('- Created:', parsedBody.date_created);
  console.log('- Last Updated:', parsedBody.last_updated);
  console.log('- Expiry:', parsedBody.metadata.order_expiry);
  console.log('======================\n');
}

export async function POST(request) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Create Basic Auth token
    const apiKey = process.env.HDFC_API_KEY;
    const basicAuth = Buffer.from(`${apiKey}:`).toString('base64');

    console.log('Sending request to HDFC:', {
      url: `https://smartgatewayuat.hdfcbank.com/orders/${orderId}`,
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'x-merchantid': process.env.HDFC_MERCHANT_ID,
        'x-customerid': orderId.split('_')[2], // Extracting customer ID from order ID
        'version': '2023-06-30',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // Make request to HDFC Bank API
    const response = await fetch(
      `https://smartgatewayuat.hdfcbank.com/orders/${orderId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${basicAuth}`,
          'x-merchantid': process.env.HDFC_MERCHANT_ID,
          'x-customerid': orderId.split('_')[2], // Extracting customer ID from order ID
          'version': '2023-06-30',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    // Log the raw response for debugging
    const responseText = await response.text();
    prettyPrintResponse({
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers),
      body: responseText
    });

    if (!response.ok) {
      return NextResponse.json(
        { 
          error: 'Failed to verify payment status',
          details: responseText,
          status: response.status,
          statusText: response.statusText
        },
        { status: response.status }
      );
    }

    // Try to parse the response as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (error) {
      console.error('Failed to parse HDFC response:', error);
      return NextResponse.json(
        { 
          error: 'Invalid response format',
          details: responseText
        },
        { status: 500 }
      );
    }

    // Return the relevant payment status information
    return NextResponse.json({
      status: data.status,
      orderId: data.order_id,
      amount: data.amount,
      transactionId: data.transaction_id,
      paymentMode: data.payment_mode,
      transactionTime: data.transaction_time,
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message
      },
      { status: 500 }
    );
  }
}