import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { format } from 'date-fns';

async function getLatestBooking(orderId) {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    console.log('No user found');
    return null;
  }

  console.log('Searching for booking with orderId:', orderId);

  // First get the latest pending booking
  const { data: pendingBookings, error: pendingError } = await supabase
    .from('bookings')
    .select(`
      *,
      experts (
        name,
        expertise
      )
    `)
    .eq('user_id', user.id)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
    .limit(1);

  if (pendingError) {
    console.error('Error fetching pending booking:', pendingError);
    return null;
  }

  const pendingBooking = pendingBookings?.[0];
  if (!pendingBooking) {
    console.log('No pending booking found');
    return null;
  }

  console.log('Found pending booking:', pendingBooking);

  // Get current timestamp for payment_time
  const payment_time = new Date().toISOString();

  // Update the booking with cancelled status and failed payment status
  const { error: updateError } = await supabase
    .from('bookings')
    .update({ 
      status: 'cancelled',
      payment_status: 'failed',
      transaction_id: orderId,
      payment_mode: 'online',
      payment_time: payment_time,
      notes: `Payment failed/cancelled. Transaction ID: ${orderId}`
    })
    .eq('id', pendingBooking.id);

  if (updateError) {
    console.error('Error updating booking:', updateError);
    return pendingBooking; // Return original booking if update fails
  }

  // Fetch the updated booking
  const { data: updatedBookings, error: fetchError } = await supabase
    .from('bookings')
    .select(`
      *,
      experts (
        name,
        expertise
      )
    `)
    .eq('id', pendingBooking.id)
    .single();

  if (fetchError) {
    console.error('Error fetching updated booking:', fetchError);
    return pendingBooking; // Return original booking if fetch fails
  }

  console.log('Updated booking:', updatedBookings);
  return updatedBookings;
}

export default async function PaymentFailurePage({
  searchParams
}) {
  const orderId = searchParams?.order_id;
  console.log('Received order_id:', orderId);

  const booking = await getLatestBooking(orderId);
  console.log('Final booking result:', booking);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600">Booking information not found.</p>
          <p className="text-sm text-gray-500 mt-2">Order ID: {orderId || 'Not provided'}</p>
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
}
