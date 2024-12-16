"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PageTransition from "../components/PageTransition";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { error: signInError, data: { user } } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('onboarded')
        .eq('id', user.id)
        .single();

      if (userError) throw userError;

      if (userData.onboarded === null || userData.onboarded === false) {
        window.location.href = '/onboarding';
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Welcome Back
              </h1>
              
            </div>
          </div>
        </section>

        {/* Login Form Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="mb-8 text-center">
                  
                  <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
                  <p className="text-gray-600 mt-2">Access your account</p>
                </div>

                <form onSubmit={handleSignIn} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                    Sign in
                  </button>
                </form>

                
              </div>

              <div className="mt-8 text-center">
                <p className="text-xs text-gray-500">
                  By continuing, you agree to our{" "}
                  <a href="/terms" className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}