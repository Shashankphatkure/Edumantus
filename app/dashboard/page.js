"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageTransition from "../components/PageTransition";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const initializeAuth = async () => {
      // Get the session first
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error('Session error:', sessionError);
        return;
      }

      if (!session) {
        window.location.href = '/login?redirect=/dashboard';
        return;
      }

      // Set up auth state change listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          if (!session) {
            window.location.href = '/login?redirect=/dashboard';
            return;
          }
          setUser(session.user);
          await Promise.all([
            fetchUserDetails(session.user.id),
            fetchBookings(session.user.id)
          ]);
        }
      );

      // Initial fetch if session exists
      setUser(session.user);
      await Promise.all([
        fetchUserDetails(session.user.id),
        fetchBookings(session.user.id)
      ]);
      setLoading(false);

      // Cleanup subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    };

    initializeAuth();
  }, []);

  const fetchUserDetails = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setUserDetails(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const fetchBookings = async (userId) => {
    try {
      // First fetch the bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', userId)
        .order('booking_date', { ascending: false });

      if (bookingsError) throw bookingsError;

      // Then fetch the expert details for each booking
      const bookingsWithExperts = await Promise.all(
        bookingsData.map(async (booking) => {
          const { data: expertData, error: expertError } = await supabase
            .from('experts')
            .select('id, name, image, role, specialties')
            .eq('id', booking.expert_id)
            .single();

          if (expertError) throw expertError;

          return {
            ...booking,
            expert: expertData
          };
        })
      );

      setBookings(bookingsWithExperts);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    return new Date(`2000/01/01 ${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6">
          {/* User Profile Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg mb-8">
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                <Image
                  src={userDetails?.avatar_url || `https://ui-avatars.com/api/?name=${userDetails?.first_name}+${userDetails?.last_name}`}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                  Welcome, {userDetails?.name}
                </h1>
                <p className="text-gray-600">{userDetails?.email}</p>
              </div>
            </div>
          </div>

          {/* Bookings Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Your Consultations</h2>
            
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-4">No consultations yet</h3>
                <p className="text-gray-600 mb-8">Book your first consultation with our experts</p>
                <Link
                  href="/book-consultation"
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
                >
                  Book Consultation
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <div key={booking.id} 
                    className="border rounded-xl p-6 hover:shadow-md transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                          <Image
                            src={booking.expert.image}
                            alt={booking.expert.name}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{booking.expert.name}</h3>
                          <p className="text-gray-600">{booking.expert.role}</p>
                          <p className="text-sm text-gray-500">
                            {formatDate(booking.booking_date)} at {formatTime(booking.booking_time)}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        <span className="text-lg font-semibold">₹{booking.amount}</span>
                        {booking.meeting_link && booking.status === 'confirmed' && (
                          <a
                            href={booking.meeting_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Join Meeting
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
