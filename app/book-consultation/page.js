"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import PageTransition from "../components/PageTransition";

export default function BookConsultation() {
  const [step, setStep] = useState(1);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchExperts();
  }, []);

  useEffect(() => {
    const expertId = searchParams.get('expert');
    if (expertId) {
      const expert = experts.find(e => e.id === parseInt(expertId));
      if (expert) {
        setSelectedExpert(expert);
        setStep(2);
      }
    }
  }, [experts, searchParams]);

  const fetchExperts = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('experts')
        .select('*')
        .eq('status', 'active')
        .order('rating', { ascending: false });

      if (error) throw error;
      setExperts(data);
    } catch (error) {
      console.error('Error fetching experts:', error);
      setError('Failed to load experts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Store booking details in session storage
        sessionStorage.setItem('pendingBooking', JSON.stringify({
          expertId: selectedExpert.id,
          date: selectedDate,
          time: selectedTime
        }));
        // Redirect to login
        window.location.href = '/login?redirect=/book-consultation';
        return;
      }

      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          user_id: user.id,
          expert_id: selectedExpert.id,
          booking_date: selectedDate,
          booking_time: selectedTime,
          status: 'pending',
          amount: selectedExpert.price,
          payment_status: 'pending',
          notes: `Consultation with ${selectedExpert.name}`
        }])
        .select()
        .single();

      if (error) throw error;
      setStep(4);
    } catch (error) {
      console.error('Error creating booking:', error);
      setError('Failed to create booking. Please try again.');
    }
  };

  const getAvailableTimeSlots = () => {
    if (!selectedExpert || !selectedDate) return [];
    
    const dayOfWeek = new Date(selectedDate)
      .toLocaleDateString('en-US', { weekday: 'long' })
      .toLowerCase();
    
    const availability = selectedExpert.availability[dayOfWeek];
    
    if (!availability) return [];

    const [start, end] = availability.split(' - ');
    const startTime = new Date(`2000/01/01 ${start}`);
    const endTime = new Date(`2000/01/01 ${end}`);
    
    const slots = [];
    let currentTime = new Date(startTime);
    
    while (currentTime < endTime) {
      slots.push(
        currentTime.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })
      );
      currentTime.setMinutes(currentTime.getMinutes() + 60);
    }

    return slots;
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading experts...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <button 
                  onClick={fetchExperts}
                  className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {experts.map((expert) => (
                  <div
                    key={expert.id}
                    className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                      selectedExpert?.id === expert.id ? "ring-2 ring-blue-600" : ""
                    }`}
                    onClick={() => setSelectedExpert(expert)}
                  >
                    <div className="relative h-64">
                      <Image
                        src={expert.image}
                        alt={expert.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl font-bold mb-1">{expert.name}</h3>
                        <p className="text-gray-200 text-sm mb-2">
                          {expert.role} • {expert.experience}
                        </p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-yellow-400">★</span>
                          <span>{expert.rating}</span>
                          <span className="text-gray-300">•</span>
                          <span>{expert.total_consultations}+ consultations</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {expert.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600">Next Available</p>
                          <p className="font-semibold">Today</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600">Consultation Fee</p>
                          <p className="font-semibold">₹{expert.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-center">
              <button
                onClick={() => setStep(2)}
                disabled={!selectedExpert}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedExpert
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Continue with {selectedExpert?.name || "Selected Expert"}
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Select Date & Time</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedTime("");
                    }}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                {selectedDate && (
                  <div>
                    <label className="block text-gray-700 mb-2">Select Time</label>
                    <div className="grid grid-cols-4 gap-3">
                      {getAvailableTimeSlots().map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                            selectedTime === time
                              ? "bg-blue-600 text-white"
                              : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-8 py-3 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-all duration-300"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedDate || !selectedTime}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedDate && selectedTime
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Continue to Payment
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
              <h3 className="text-2xl font-bold mb-6">Booking Summary</h3>
              <div className="flex items-center gap-4 pb-6 border-b">
                <div className="relative w-20 h-20">
                  <Image
                    src={selectedExpert.image}
                    alt={selectedExpert.name}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{selectedExpert.name}</h4>
                  <p className="text-gray-600">{selectedExpert.role}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium">{new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Consultation Fee</span>
                  <span className="font-medium">₹{selectedExpert.price}</span>
                </div>
              </div>
              <div className="pt-6 border-t space-y-4">
                <button
                  onClick={handleBooking}
                  className="w-full bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
                >
                  Confirm & Pay
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="w-full border border-gray-200 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-500 text-2xl">✓</span>
              </div>
              <h3 className="text-2xl font-bold">Booking Confirmed!</h3>
              <p className="text-gray-600">
                Your consultation has been booked successfully. We've sent you an email with all the details.
              </p>
              <div className="pt-6">
                <Link
                  href="/dashboard"
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
                >
                  View My Bookings
                </Link>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Book a Consultation</h1>
            
            <div className="relative">
              <div className="flex justify-between items-center mb-8 relative z-10">
                <div className="flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto ${
                    step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}>
                    1
                  </div>
                  <p className={`text-center mt-2 text-sm ${
                    step >= 1 ? "text-blue-600 font-medium" : "text-gray-500"
                  }`}>
                    Select Expert
                  </p>
                </div>

                <div className="flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto ${
                    step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}>
                    2
                  </div>
                  <p className={`text-center mt-2 text-sm ${
                    step >= 2 ? "text-blue-600 font-medium" : "text-gray-500"
                  }`}>
                    Choose Time
                  </p>
                </div>

                <div className="flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto ${
                    step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}>
                    3
                  </div>
                  <p className={`text-center mt-2 text-sm ${
                    step >= 3 ? "text-blue-600 font-medium" : "text-gray-500"
                  }`}>
                    Payment
                  </p>
                </div>
              </div>

              <div className="absolute top-5 left-0 right-0 flex items-center justify-between z-0">
                <div className={`flex-1 h-[2px] ${
                  step > 1 ? "bg-blue-600" : "bg-gray-200"
                }`}></div>
                <div className={`flex-1 h-[2px] ${
                  step > 2 ? "bg-blue-600" : "bg-gray-200"
                }`}></div>
              </div>
            </div>
          </div>

          {renderStep()}
        </div>
      </div>
    </PageTransition>
  );
} 