"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from 'next/link';

export default function PaymentCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState(null);

  useEffect(() => {
    const updateBookingStatus = async () => {
      try {
        // Safely get parameters from searchParams
        const paymentStatus = searchParams.get('status')?.toUpperCase();
        const orderId = searchParams.get('order_id');
        const transactionId = searchParams.get('transaction_id');

        // Log for debugging
        console.log('Payment Parameters:', {
          status: paymentStatus,
          orderId,
          transactionId
        });

        if (!orderId) {
          setStatus('error');
          setError('Payment reference not found');
          return;
        }

        // Extract booking ID from order ID
        const bookingId = orderId.split('_')[1];
        if (!bookingId) {
          setStatus('error');
          setError('Invalid payment reference');
          return;
        }

        // Verify booking exists
        const { data: booking, error: fetchError } = await supabase
          .from('bookings')
          .select('id, status, payment_status')
          .eq('id', bookingId)
          .single();

        if (fetchError || !booking) {
          setStatus('error');
          setError('Booking not found');
          return;
        }

        if (paymentStatus === 'SUCCESS') {
          const { error: updateError } = await supabase
            .from('bookings')
            .update({
              payment_status: 'completed',
              status: 'confirmed',
              transaction_id: transactionId,
              updated_at: new Date().toISOString()
            })
            .eq('id', bookingId);

          if (updateError) throw updateError;

          setStatus('success');
          setTimeout(() => {
            router.push('/dashboard');
          }, 3000);
        } else {
          await supabase
            .from('bookings')
            .update({
              payment_status: 'failed',
              status: 'cancelled',
              transaction_id: transactionId,
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

    // Only run if we have search params
    if (searchParams && searchParams.get('status')) {
      updateBookingStatus();
    }
  }, [searchParams, router]);

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
