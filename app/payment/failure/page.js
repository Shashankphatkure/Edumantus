import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { format } from 'date-fns';

async function getLatestBooking(orderId) {
  if (!orderId) {
    console.log('No order ID provided');
    return null;
  }

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  
  console.log('Searching for booking with orderId:', orderId);

  try {
    // First try to find a booking with this transaction_id
    let { data: booking } = await supabase
      .from('bookings')
      .select(`
        *,
        experts (
          name,
          expertise
        )
      `)
      .eq('transaction_id', orderId)
      .single();

    // If no booking found with transaction_id, try to find by the order ID pattern
    if (!booking) {
      const { data: pendingBookings } = await supabase
        .from('bookings')
        .select(`
          *,
          experts (
            name,
            expertise
          )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(5);

      // Find the matching pending booking
      const pendingBooking = pendingBookings?.find(booking => 
        orderId.includes(booking.user_id)
      );

      if (pendingBooking) {
        booking = pendingBooking;
      }
    }

    if (!booking) {
      console.log('No booking found');
      return null;
    }

    // Only update the booking if it's still in pending status
    if (booking.status === 'pending') {
      try {
        const { data: updatedBooking, error } = await supabase
          .from('bookings')
          .update({
            status: 'cancelled',
            payment_status: 'failed',
            payment_mode: 'online',
            payment_time: new Date().toISOString(),
            transaction_id: orderId,
            notes: `Payment failed/cancelled. Transaction ID: ${orderId}. Status: NEW, SDK Status: backpressed`
          })
          .eq('id', booking.id)
          .select(`
            *,
            experts (
              name,
              expertise
            )
          `)
          .single();

        if (error) {
          console.error('Error updating booking:', error);
          return booking;
        }

        console.log('Updated booking:', updatedBooking);
        return updatedBooking;
      } catch (error) {
        console.error('Error updating booking:', error);
        return booking;
      }
    }

    return booking;
  } catch (error) {
    console.error('Error in getLatestBooking:', error);
    return null;
  }
}

export default async function PaymentFailurePage({
  searchParams
}) {
  try {
    const orderId = searchParams?.orderId;
    if (!orderId) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <p className="text-gray-600">No order ID provided.</p>
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
              Go to Dashboard
            </Link>
          </div>
        </div>
      );
    }

    const booking = await getLatestBooking(orderId);
    console.log('Final booking result:', booking);

    if (!booking) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <p className="text-gray-600">Booking information not found or payment status could not be verified.</p>
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
              Go to Dashboard
            </Link>
          </div>
        </div>
      );
    }

    // Format payment time if it exists
    const formattedPaymentTime = booking.payment_time 
      ? format(new Date(booking.payment_time), 'PPpp')
      : 'Not available';

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-red-500 p-4">
            <div className="flex items-center justify-center">
              <svg
                className="h-12 w-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-center text-white mt-2">
              Payment Failed
            </h2>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Booking Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Expert</p>
                  <p className="font-medium">{booking.experts.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date & Time</p>
                  <p className="font-medium">
                    {format(new Date(booking.booking_date), 'MMMM d, yyyy')} at{' '}
                    {format(new Date(`2000-01-01T${booking.booking_time}`), 'h:mm a')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="font-medium">₹{booking.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Transaction ID</p>
                  <p className="font-medium text-sm">{booking.transaction_id || 'Not available'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Booking Status</p>
                  <p className="font-medium capitalize">{booking.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Mode</p>
                  <p className="font-medium capitalize">{booking.payment_mode || 'Not available'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Time</p>
                  <p className="font-medium">{formattedPaymentTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Status</p>
                  <p className="font-medium capitalize">{booking.payment_status}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <p className="text-gray-600 text-sm mb-6">
                We apologize for the inconvenience. You can try booking again or contact our support team for assistance.
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  href="/book-consultation"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </Link>
                <Link
                  href="/support"
                  className="inline-block border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in PaymentFailurePage:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600">An error occurred while processing your request.</p>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }
}
