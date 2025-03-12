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
        price: '₹2,499',
        features: [
          'One Counseling session',
          'Career Test',
          'Summary Report with Career Recommendations'
        ]
      },
      {
        name: 'Standard Package',
        price: '₹7,499',
        highlight: true,
        features: [
          'Two Counselling Sessions',
          'One Parent Counselling Session',
          'Career Test',
          'Detailed Test Report with Career Recommendations',
          'Admission Guidance for max three UG/PG Programs',
          'Strategic Career Planning',
          'Extended Career Consultation (3 Months)'
        ]
      },
      {
        name: 'Premium Package',
        price: '₹19,999',
        features: [
          'Six Counselling Sessions',
          'Two Parent Counselling Session',
          'Career Test with Career Recommendations',
          'Strategic Career Planning',
          'Admission Support for three UG/PG Programs',
          'Extended Career Consultation (6 Months)'
        ]
      }
    ],
    admission: [
      {
        name: 'Basic Package',
        price: '₹4,999',
        features: [
          'One Course in Indian Colleges/universities',
          'Validity (Till Admission)'
        ]
      },
      {
        name: 'Exclusive Package',
        price: '₹8,499',
        features: [
          '2-3 Courses in Indian Colleges/universities',
          'Validity (Till Admission)'
        ]
      }
    ],
    professionals: [
      {
        name: 'Personality Test',
        price: '₹2,499',
        description: 'Personality Test & Recommendation Report'
      },
      {
        name: 'Corporate Readiness Test',
        price: '₹2,499',
        description: 'Corporate Readiness Test & Recommendation Report'
      },
      {
        name: 'Combo Package',
        price: '₹3,999',
        description: 'Get Both for Just ₹3,999! (Save ₹999)'
      }
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
        <section className="py-8 px-4">
          <div className="container mx-auto">
            {billingCycle === 'students' && (
              <>
                {/* Career Consultation */}
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">Career Consultation</h2>
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
              </>
            )}

            {billingCycle === 'professionals' && (
              <>
                {/* Professional Services Heading */}
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">Personality Test/Corporate Readiness Test</h2>
                </div>
                
                {/* Professional Services */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                  {categories.professionals.map((service, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">{service.name}</h3>
                      <p className="text-3xl font-bold text-blue-600 mb-2">{service.price}</p>
                      <p className="text-gray-600 mb-6">
                        {index !== 2 ? '✅ ' : ''}{service.description}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </PageTransition>
  );
} 