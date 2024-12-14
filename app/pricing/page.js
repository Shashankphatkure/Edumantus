"use client";

import { useState } from 'react';
import Link from 'next/link';
import PageTransition from '../components/PageTransition';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Basic',
      description: 'Perfect for individuals starting their mental health journey',
      monthlyPrice: '₹1,499',
      yearlyPrice: '₹14,999',
      yearlyDiscount: 'Save ₹2,989',
      features: [
        '2 Video Consultations/month',
        'Chat Support (Business Hours)',
        'Basic Mental Health Resources',
        'Email Support',
        'Mobile App Access',
        'Progress Tracking'
      ],
      highlight: false,
      ctaText: 'Get Started'
    },
    {
      name: 'Pro',
      description: 'Ideal for those seeking comprehensive mental health care',
      monthlyPrice: '₹2,999',
      yearlyPrice: '₹29,999',
      yearlyDiscount: 'Save ₹5,989',
      features: [
        '4 Video Consultations/month',
        '24/7 Chat Support',
        'Premium Mental Health Resources',
        'Priority Email & Phone Support',
        'Mobile App Access',
        'Advanced Progress Tracking',
        'Personalized Care Plan',
        'Monthly Progress Report',
        'Group Therapy Sessions'
      ],
      highlight: true,
      ctaText: 'Most Popular'
    },
    {
      name: 'Family',
      description: 'Complete mental health care for the whole family',
      monthlyPrice: '₹4,999',
      yearlyPrice: '₹49,999',
      yearlyDiscount: 'Save ₹9,989',
      features: [
        '6 Video Consultations/month',
        '24/7 Chat Support',
        'Premium Mental Health Resources',
        'Priority Support on All Channels',
        'Mobile App Access for All Members',
        'Family Progress Dashboard',
        'Personalized Care Plans',
        'Weekly Progress Reports',
        'Group & Family Therapy Sessions',
        'Emergency Support'
      ],
      highlight: false,
      ctaText: 'Get Started'
    }
  ];

  const commonFeatures = [
    {
      title: 'Expert Therapists',
      description: 'Access to certified mental health professionals',
      icon: '👨‍⚕️'
    },
    {
      title: 'Secure Platform',
      description: 'End-to-end encrypted video sessions',
      icon: '🔒'
    },
    {
      title: 'Flexible Scheduling',
      description: 'Book sessions at your convenience',
      icon: '📅'
    },
    {
      title: 'Multi-device Access',
      description: 'Use on any device, anywhere',
      icon: '📱'
    }
  ];

  const faqs = [
    {
      question: 'Can I switch plans anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. The changes will be reflected in your next billing cycle.'
    },
    {
      question: 'Is there a refund policy?',
      answer: 'We offer a 7-day money-back guarantee if youre not satisfied with our services.'
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'Yes, you can cancel your subscription at any time. Youll continue to have access until the end of your billing period.'
    },
    {
      question: 'Are the video consultations private?',
      answer: 'Absolutely. All video consultations are end-to-end encrypted and completely private.'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Choose the perfect plan for your mental health journey. 
              All plans include access to qualified professionals and our secure platform.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  billingCycle === 'monthly' 
                    ? 'bg-white text-blue-600' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  billingCycle === 'yearly' 
                    ? 'bg-white text-blue-600' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-3 gap-8 -mt-32">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ${
                    plan.highlight ? 'ring-4 ring-blue-600 ring-opacity-50' : ''
                  }`}
                >
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {plan.description}
                    </p>
                    <div className="mb-6">
                      <p className="text-4xl font-bold text-gray-900">
                        {billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                      </p>
                      <p className="text-gray-600">
                        per {billingCycle === 'monthly' ? 'month' : 'year'}
                      </p>
                      {billingCycle === 'yearly' && (
                        <p className="text-green-600 font-medium mt-1">
                          {plan.yearlyDiscount}
                        </p>
                      )}
                    </div>
                    <Link
                      href="/book-consultation"
                      className={`block text-center px-6 py-3 rounded-xl font-semibold transition-colors duration-300 ${
                        plan.highlight
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {plan.ctaText}
                    </Link>
                  </div>
                  <div className="p-6 bg-gray-50 border-t">
                    <p className="font-medium text-gray-900 mb-4">What's included:</p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Features */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              All Plans Include
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {commonFeatures.map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="grid gap-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Choose a plan that works for you and begin your path to better mental health today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-consultation"
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-300"
              >
                Get Started
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors duration-300"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
} 