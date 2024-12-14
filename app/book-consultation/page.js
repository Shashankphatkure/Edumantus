"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageTransition from "../components/PageTransition";

export default function BookConsultation() {
  const [step, setStep] = useState(1);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const experts = [
    {
      id: 1,
      name: "Dr. Sharma",
      role: "Clinical Psychologist",
      image: "https://picsum.photos/seed/expert1/400/500",
      specialties: ["Anxiety", "Depression", "PTSD"],
      experience: "15+ Years",
      price: "₹1,500",
      nextAvailable: "Today",
      rating: 4.9,
      totalConsultations: 1500
    },
    {
      id: 2,
      name: "Dr. Patel",
      role: "Psychiatrist",
      image: "https://picsum.photos/seed/expert2/400/500",
      specialties: ["Bipolar Disorder", "Schizophrenia", "OCD"],
      experience: "12+ Years",
      price: "₹2,000",
      nextAvailable: "Tomorrow",
      rating: 4.8,
      totalConsultations: 1200
    },
    {
      id: 3,
      name: "Dr. Gupta",
      role: "Relationship Counselor",
      image: "https://picsum.photos/seed/expert3/400/500",
      specialties: ["Couples Therapy", "Family Counseling", "Marriage"],
      experience: "10+ Years",
      price: "₹1,800",
      nextAvailable: "Today",
      rating: 4.9,
      totalConsultations: 900
    }
  ];

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-8">
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
                      <p className="text-gray-200 text-sm mb-2">{expert.role} • {expert.experience}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-400">★</span>
                        <span>{expert.rating}</span>
                        <span className="text-gray-300">•</span>
                        <span>{expert.totalConsultations}+ consultations</span>
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
                        <p className="font-semibold">{expert.nextAvailable}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600">Consultation Fee</p>
                        <p className="font-semibold">{expert.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                {selectedDate && (
                  <div>
                    <label className="block text-gray-700 mb-2">Select Time</label>
                    <div className="grid grid-cols-4 gap-3">
                      {timeSlots.map((time) => (
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
                    className="rounded-xl object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-semibold">{selectedExpert.name}</h4>
                  <p className="text-gray-600">{selectedExpert.role}</p>
                </div>
              </div>
              <div className="space-y-4 pb-6 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-semibold">{new Date(selectedDate).toLocaleDateString("en-IN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="font-semibold">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">60 minutes</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total Amount</span>
                  <span className="font-bold text-blue-600">{selectedExpert.price}</span>
                </div>
                <button
                  onClick={() => alert("Payment gateway integration pending")}
                  className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              className="mt-6 px-8 py-3 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-all duration-300"
            >
              Back
            </button>
          </div>
        );
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4">Book Your Consultation</h1>
            <p className="text-gray-600 text-lg">
              Choose your preferred expert and schedule a time that works best for you
            </p>
          </div>

          {/* Progress Steps */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-600 -translate-y-1/2" style={{ width: `${(step - 1) * 50}%` }}></div>
              {["Choose Expert", "Select Time", "Payment"].map((text, index) => (
                <div key={text} className="relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step > index + 1 ? "bg-blue-600 text-white" :
                    step === index + 1 ? "bg-blue-600 text-white" :
                    "bg-gray-200 text-gray-600"
                  }`}>
                    {index + 1}
                  </div>
                  <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium text-gray-600">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          {renderStep()}
        </div>
      </div>
    </PageTransition>
  );
} 