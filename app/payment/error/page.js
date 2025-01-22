import Link from 'next/link';

export default function PaymentErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Something Went Wrong
        </h2>
        <p className="text-gray-600 mb-8">
          An error occurred while processing your payment. Please contact support if this persists.
        </p>
        <div className="space-y-4">
          <Link
            href="/book-consultation"
            className="block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </Link>
          <Link
            href="/support"
            className="block text-blue-600 hover:text-blue-700 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
