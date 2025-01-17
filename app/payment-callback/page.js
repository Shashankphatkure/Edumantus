"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from 'next/link';
import crypto from 'crypto';

// HMAC verification function
const verifyHMAC = (params, responseKey) => {
  try {
    const receivedHash = params.get('hash');
    if (!receivedHash) return false;

    // Remove hash from params before calculating
    const allParams = Object.fromEntries(params.entries());
    delete allParams.hash;

    // Sort parameters alphabetically
    const sortedParams = Object.keys(allParams)
      .sort()
      .reduce((acc, key) => {
        acc[key] = allParams[key];
        return acc;
      }, {});

    // Create string of key=value pairs
    const paramString = Object.entries(sortedParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    // Calculate HMAC
    const calculatedHash = crypto
      .createHmac('sha256', responseKey)
      .update(paramString)
      .digest('hex');

    return receivedHash === calculatedHash;
  } catch (error) {
    console.error('HMAC verification error:', error);
    return false;
  }
};

function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState(null);

  useEffect(() => {
    const updateBookingStatus = async () => {
      try {
        // Verify HMAC first
        const isValid = verifyHMAC(searchParams, process.env.NEXT_PUBLIC_HDFC_RESPONSE_KEY);
        if (!isValid) {
          setStatus('error');
          setError('Invalid payment response signature');
          return;
        }

        // Get parameters from response
        const paymentStatus = searchParams.get('payment_status')?.toUpperCase() || '';
        const orderId = searchParams.get('order_id') || '';
        const transactionId = searchParams.get('merchant_transaction_id') || '';
        const paymentMode = searchParams.get('payment_instrument') || '';
        const paymentTime = searchParams.get('transaction_date') || null;

        // Log for debugging
        console.log('HDFC Payment Response:', {
          status: paymentStatus,
          orderId,
          transactionId,
          paymentMode,
          paymentTime,
          allParams: Object.fromEntries(searchParams.entries())
        });

        if (!orderId) {
          setStatus('error');
          setError('Invalid payment response: Missing order ID');
          return;
        }

        // Extract booking ID from order ID (FORMAT: ORDER_<bookingId>_<timestamp>)
        const bookingId = orderId.split('_')[1];
        if (!bookingId) {
          setStatus('error');
          setError('Invalid order ID format');
          return;
        }

        // Verify booking exists
        const { data: booking, error: fetchError } = await supabase
          .from('bookings')
          .select('id, status, payment_status')
          .eq('id', bookingId)
          .single();

        if (fetchError || !booking) {
          console.error('Booking fetch error:', fetchError);
          setStatus('error');
          setError('Booking not found');
          return;
        }

        // Handle payment status
        if (paymentStatus === 'SUCCESS' || paymentStatus === 'CAPTURED') {
          const { error: updateError } = await supabase
            .from('bookings')
            .update({
              payment_status: 'completed',
              status: 'confirmed',
              transaction_id: transactionId,
              payment_mode: paymentMode || null,
              payment_time: paymentTime ? new Date(paymentTime).toISOString() : null,
              updated_at: new Date().toISOString()
            })
            .eq('id', bookingId);

          if (updateError) {
            throw updateError;
          }

          setStatus('success');
          setTimeout(() => {
            router.push('/dashboard');
          }, 3000);
        } else {
          // Handle failed payment
          await supabase
            .from('bookings')
            .update({
              payment_status: 'failed',
              status: 'cancelled',
              transaction_id: transactionId,
              payment_mode: paymentMode || null,
              payment_time: paymentTime ? new Date(paymentTime).toISOString() : null,
              updated_at: new Date().toISOString()
            })
            .eq('id', bookingId);

          setStatus('failed');
        }
      } catch (error) {
        console.error('Payment callback error:', error);
        setStatus('error');
        setError(error.message || 'An error occurred while processing payment');
      }
    };

    if (searchParams && searchParams.toString()) {
      updateBookingStatus();
    } else {
      setStatus('error');
      setError('No payment response received');
    }
  }, [searchParams, router, supabase]);

  const renderContent = () => {
    switch (status) {
      case 'processing':
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment</h2>
            <p className="text-gray-600">Please wait while we confirm your payment...</p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-500 text-2xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">Your consultation has been booked successfully.</p>
            <p className="text-sm text-gray-600 mb-4">Redirecting to dashboard...</p>
            <Link 
              href="/dashboard"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Go to Dashboard
            </Link>
          </div>
        );

      case 'failed':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-500 text-2xl">×</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
            <p className="text-gray-600 mb-6">Your payment could not be processed.</p>
            <Link 
              href="/book-consultation"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Try Again
            </Link>
          </div>
        );

      case 'error':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-500 text-2xl">!</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Something Went Wrong</h2>
            <p className="text-gray-600 mb-4">{error || 'An error occurred while processing your payment.'}</p>
            <div className="space-y-3">
              <Link 
                href="/dashboard"
                className="block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Go to Dashboard
              </Link>
              <Link 
                href="/support"
                className="block text-blue-600 hover:underline"
              >
                Contact Support
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {renderContent()}
      </div>
    </div>
  );
}

export default function PaymentCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading</h2>
            <p className="text-gray-600">Please wait...</p>
          </div>
        </div>
      </div>
    }>
      <PaymentCallbackContent />
    </Suspense>
  );
}
