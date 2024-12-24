"use client";

import { useState } from 'react';
import Link from 'next/link';
import PageTransition from '../components/PageTransition';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('students');

  const categories = {
    students: [
      {
        name: 'Basic Package',
        price: '₹1,999',
        features: [
          'Single counseling session (1 hour)',
          'Basic career assessment or stream selection',
          'Summary report with recommendations'
        ]
      },
      {
        name: 'Standard Package',
        price: '₹4,999',
        highlight: true,
        features: [
          'Multiple sessions (3)',
          'Psychometric testing and detailed analysis',
          'Stream/career selection & career planning',
          'Follow-up for 3–6 months'
        ]
      },
      {
        name: 'Premium Package',
        price: '₹19,999',
        features: [
          'Psychometric testing and detailed analysis',
          'Stream/career selection & career planning',
          'Comprehensive counseling and mentorship',
          'Follow-up for 12 months (Min 10 sessions)',
          'Assistance with college selection and applications'
        ]
      }
    ],
    admission: [
      {
        name: 'Basic Package',
        price: '₹2,999',
        features: [
          'One Course in Indian Colleges/universities',
          'Validity (Till Admission Max up to 2 months)'
        ]
      },
      {
        name: 'Exclusive Package',
        price: '₹7,499',
        features: [
          '2-3 Courses in Indian Colleges/universities',
          'Validity (Till Admission Max up to 6 months)'
        ]
      }
    ],
    professionals: [
      {
        name: 'Consultation',
        price: '₹1,200',
        description: 'Per Executive / Per Session'
      },
      {
        name: 'Personality Development',
        price: '₹2,500',
        description: 'Per Executive / Per Session'
      },
      {
        name: 'Leadership Coaching & Mentoring',
        price: '₹3,000',
        description: 'Per Executive / Per Session'
      }
    ]
  };

  const payPerServices = {
    students: [
      { name: 'Psychometric test (Detailed Report)', price: '₹3,000' },
      { name: 'Resume Building', price: '₹1,000' },
      { name: 'Interview Preparation (per session)', price: '₹1,000' },
      { name: 'Personality Development Session', price: '₹1,500' },
      { name: 'Personalized (Special) Counselling session', price: '₹1,500' }
    ],
    professionals: [
      { name: 'Skill/Leadership Test (Detailed Report)', price: '₹4,000' },
      { name: 'Resume Building', price: '₹3,000' },
      { name: 'Interview Preparation (per session)', price: '₹2,000' },
      { name: 'Personality Development Session', price: '₹2,500' },
      { name: 'Leadership Development Session', price: '₹3,000' }
    ]
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Pricing Strategy
            </h1>
            
            {/* Category Toggle */}
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1">
              <button
                onClick={() => setBillingCycle('students')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  billingCycle === 'students' ? 'bg-white text-blue-600' : 'text-white hover:bg-white/10'
                }`}
              >
                Students
              </button>
              <button
                onClick={() => setBillingCycle('professionals')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  billingCycle === 'professionals' ? 'bg-white text-blue-600' : 'text-white hover:bg-white/10'
                }`}
              >
                Professionals
              </button>
            </div>
          </div>
        </section>

        {/* Pricing Cards Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            {billingCycle === 'students' && (
              <>
                {/* Career Consultation */}
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">Price For School/College Students</h2>
                  <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-semibold">Career Consultation</h3>
                    <p className="text-2xl font-bold text-blue-600 mt-2">₹800</p>
                    <p className="text-gray-600">(inclusive all taxes) Per Student / Per Session</p>
                  </div>
                </div>

                {/* Main Packages */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                  {categories.students.map((plan, index) => (
                    <div key={index} className={`bg-white rounded-lg shadow-lg p-6 ${plan.highlight ? 'border-2 border-blue-500' : ''}`}>
                      <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                      <p className="text-3xl font-bold text-blue-600 mb-6">{plan.price}</p>
                      <ul className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Admission Assistance */}
                <div className="mb-16">
                  <h2 className="text-3xl font-bold mb-8 text-center">Admission Assistance</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {categories.admission.map((plan, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                        <p className="text-3xl font-bold text-blue-600 mb-6">{plan.price}</p>
                        <ul className="space-y-3">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pay-Per-Service Options */}
                <div className="mb-16">
                  <h2 className="text-3xl font-bold mb-8 text-center">Pay-Per-Service Options</h2>
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {payPerServices.students.map((service, index) => (
                        <div key={index} className="flex justify-between items-center p-4 border-b">
                          <span>{service.name}</span>
                          <span className="font-semibold">{service.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Free Initial Offerings */}
                <div className="bg-blue-50 rounded-lg p-6 mb-16">
                  <h2 className="text-2xl font-bold mb-4 text-center">Free Initial Offerings</h2>
                  <div className="space-y-4">
                    <p className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Free Introductory Session: 30 minutes for career counseling
                    </p>
                    <p className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Free Career Assessment Test: Test Absolutely free on sign-up and a summary report
                    </p>
                    <p className="text-sm text-gray-600 mt-4">
                      *This offer is valid only for first-time sign-ups and cannot be combined with any other offers.
                    </p>
                  </div>
                </div>
              </>
            )}

            {billingCycle === 'professionals' && (
              <>
                {/* Professional Services */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                  {categories.professionals.map((service, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">{service.name}</h3>
                      <p className="text-3xl font-bold text-blue-600 mb-2">{service.price}</p>
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      
                      {/* Common Benefits */}
                      <div className="space-y-3">
                        <h4 className="font-semibold">All Plans Include:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Focused 60-Minute Sessions
                          </li>
                          <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Personalized Guidance
                          </li>
                          <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Professional Insights
                          </li>
                          <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Practical Strategies & Tips
                          </li>
                          <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Constructive Feedback
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Professional Pay-Per-Service Options */}
                <div className="mb-16">
                  <h2 className="text-3xl font-bold mb-8 text-center">Pay-Per-Service Options</h2>
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {payPerServices.professionals.map((service, index) => (
                        <div key={index} className="flex justify-between items-center p-4 border-b">
                          <span>{service.name}</span>
                          <span className="font-semibold">{service.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </PageTransition>
  );
} 