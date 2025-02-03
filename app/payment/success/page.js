import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { format } from 'date-fns';

async function getLatestBooking(orderId) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  // If we have an orderId, try to find that specific booking
  if (orderId) {
    const { data: booking, error } = await supabase
      .from('bookings')
      .select(`
        *,
        experts (
          name,
          expertise
        )
      `)
      .eq('transaction_id', orderId)
      .eq('status', 'confirmed')
      .single();

    if (!error && booking) {
      return booking;
    }
  }

  // Fallback to getting the latest confirmed booking
  const { data: booking, error } = await supabase
    .from('bookings')
    .select(`
      *,
      experts (
        name,
        expertise
      )
    `)
    .eq('user_id', user.id)
    .eq('status', 'confirmed')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !booking) {
    console.error('Error fetching booking:', error);
    return null;
  }

  return booking;
}

export default async function PaymentSuccessPage({
  searchParams
}) {
  const orderId = searchParams?.orderId;
  console.log('Received orderId:', orderId);

  const booking = await getLatestBooking(orderId);
  console.log('Final booking result:', booking);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600">Booking information not found.</p>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-green-500 p-4">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-center text-white mt-2">
            Payment Successful!
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
                <p className="text-sm text-gray-600">Amount Paid</p>
                <p className="font-medium">₹{booking.amount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Transaction ID</p>
                <p className="font-medium text-sm">{booking.transaction_id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Booking Status</p>
                <p className="font-medium capitalize">{booking.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Status</p>
                <p className="font-medium capitalize">{booking.payment_status}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <p className="text-gray-600 text-sm mb-6">
              A confirmation email has been sent to your registered email address.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/dashboard"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/support"
                className="inline-block border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Need Help?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
