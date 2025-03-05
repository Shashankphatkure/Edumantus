import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

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
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required', status: 'FAILED' },
        { status: 400 }
      );
    }
    
    // Extract booking ID from order ID
    const orderParts = orderId.split('_');
    if (orderParts.length < 4) {
      return NextResponse.json(
        { error: 'Invalid order ID format', status: 'FAILED' },
        { status: 400 }
      );
    }
    
    const bookingId = orderParts[3];
    
    // Fetch booking details from database to verify amount
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('*, experts(price)')
      .eq('id', bookingId)
      .single();
      
    if (bookingError || !booking) {
      console.error('Error fetching booking:', bookingError);
      return NextResponse.json(
        { error: 'Booking not found', status: 'FAILED' },
        { status: 404 }
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
    
    // SECURITY FIX: Verify the payment amount matches the stored amount
    const receivedAmount = data.amount ? parseFloat(data.amount) : null;
    const storedAmount = booking.amount;
    const expertPrice = booking.experts?.price;
    
    // Log verification details
    console.log('Payment amount verification:', {
      receivedAmount,
      storedAmount,
      expertPrice,
      match: receivedAmount === storedAmount && storedAmount === expertPrice
    });
    
    // If amount doesn't match, reject the payment
    if (receivedAmount !== null && 
        (Math.abs(receivedAmount - storedAmount) > 0.01 || Math.abs(storedAmount - expertPrice) > 0.01)) {
      console.error('Payment amount mismatch detected:', {
        receivedAmount,
        storedAmount,
        expertPrice
      });
      
      // Update booking to mark potential fraud
      await supabase
        .from('bookings')
        .update({
          payment_status: 'rejected',
          status: 'cancelled',
          notes: `Payment rejected due to amount mismatch. Expected: ${storedAmount}, Received: ${receivedAmount}`
        })
        .eq('id', bookingId);
        
      return NextResponse.json({ 
        error: 'Payment amount mismatch', 
        status: 'FAILED',
        details: {
          receivedAmount,
          storedAmount,
          expertPrice
        }
      }, { status: 400 });
    }

    // Return the relevant payment status information with verified amount
    return NextResponse.json({ 
      status: data.status || 'FAILED',
      verifiedAmount: storedAmount,
      paymentVerified: true
    }, { status: 200 });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: error.message, status: 'FAILED' },
      { status: 500 }
    );
  }
}