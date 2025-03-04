import Link from 'next/link';

export default function PaymentErrorPage({ searchParams }) {
  // Check if this is a fraud/security related error
  const reason = searchParams?.reason;
  const isSecurityError = reason === 'amount_mismatch';
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mb-4">
          <svg
            className={`mx-auto h-12 w-12 ${isSecurityError ? 'text-red-500' : 'text-yellow-500'}`}
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
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {isSecurityError ? 'Security Alert' : 'Payment Error'}
        </h2>
        <p className="text-gray-600 mb-6">
          {isSecurityError ? (
            <>
              We've detected a potential security issue with this transaction. 
              For your protection, the payment process has been terminated.
              This incident has been logged and our security team has been notified.
            </>
          ) : (
            <>
              There was an error processing your payment. 
              Your payment has not been completed, and you have not been charged.
            </>
          )}
        </p>
        <div className="flex flex-col space-y-3">
          <Link
            href="/dashboard"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Return to Dashboard
          </Link>
          {!isSecurityError && (
            <Link
              href="/book-consultation"
              className="border border-blue-600 text-blue-600 py-2 px-4 rounded hover:bg-blue-50 transition-colors"
            >
              Try Again
            </Link>
          )}
          <Link
            href="/support"
            className="text-blue-600 hover:underline"
          >
            Need help? Contact support
          </Link>
        </div>
      </div>
    </div>
  );
}
