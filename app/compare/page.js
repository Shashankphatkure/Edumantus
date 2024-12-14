"use client";

import PageTransition from '../components/PageTransition';
import Link from 'next/link';

export default function Compare() {
  const competitors = [
    {
      name: 'Edumantus',
      description: 'Complete mental health platform with personalized care',
      highlight: true,
      features: {
        'Video Consultations': '✓ HD Quality',
        'Chat Support': '✓ 24/7 Support',
        'Mobile App': '✓ Full Featured',
        'Emergency Support': '✓ 24/7 Access',
        'Therapist Qualification': '✓ Min. 8 Years Experience',
        'Session Duration': '45-60 minutes',
        'Booking Flexibility': '✓ Reschedule Anytime',
        'Group Sessions': '✓ Included in Pro & Family',
        'Family Counseling': '✓ Dedicated Plans',
        'Data Privacy': '✓ End-to-End Encrypted',
        'Personalized Care': '✓ AI-Powered Matching',
        'Progress Tracking': '✓ Detailed Analytics',
        'Resource Library': '✓ Extensive Collection',
        'Pricing': 'From ₹1,499/month',
        'Money-back Guarantee': '✓ 7 Days'
      }
    },
    {
      name: 'Provider A',
      description: 'Basic online therapy platform',
      highlight: false,
      features: {
        'Video Consultations': '✓ Standard Quality',
        'Chat Support': '✓ Business Hours',
        'Mobile App': '✓ Basic Features',
        'Emergency Support': '✗',
        'Therapist Qualification': '✓ Min. 3 Years Experience',
        'Session Duration': '30-45 minutes',
        'Booking Flexibility': '✓ 24hr Notice',
        'Group Sessions': '✗',
        'Family Counseling': '✗',
        'Data Privacy': '✓ Standard Encryption',
        'Personalized Care': '✓ Basic Matching',
        'Progress Tracking': '✓ Basic Metrics',
        'Resource Library': '✓ Limited Collection',
        'Pricing': 'From ₹1,999/month',
        'Money-back Guarantee': '✓ 3 Days'
      }
    },
    {
      name: 'Provider B',
      description: 'Traditional therapy platform',
      highlight: false,
      features: {
        'Video Consultations': '✓ Standard Quality',
        'Chat Support': '✗',
        'Mobile App': '✗',
        'Emergency Support': '✗',
        'Therapist Qualification': '✓ Min. 5 Years Experience',
        'Session Duration': '45 minutes',
        'Booking Flexibility': '✓ 48hr Notice',
        'Group Sessions': '✓ Additional Cost',
        'Family Counseling': '✓ Additional Cost',
        'Data Privacy': '✓ Standard Encryption',
        'Personalized Care': '✗',
        'Progress Tracking': '✗',
        'Resource Library': '✓ Basic Collection',
        'Pricing': 'From ₹2,499/month',
        'Money-back Guarantee': '✗'
      }
    }
  ];

  const uniqueFeatures = [
    {
      title: 'AI-Powered Matching',
      description: 'Our advanced algorithm ensures youre paired with the perfect therapist based on your needs, preferences, and goals.',
      icon: '🤖'
    },
    {
      title: 'Comprehensive Family Plans',
      description: 'Unique family plans that cover multiple members with shared progress tracking and family therapy sessions.',
      icon: '👨‍👩‍👧‍👦'
    },
    {
      title: 'Flexible Session Management',
      description: 'Easily reschedule sessions, switch therapists, or change your plan without any hassle.',
      icon: '📅'
    },
    {
      title: 'Advanced Security',
      description: 'Military-grade encryption for all communications and strict privacy protocols to protect your data.',
      icon: '🔒'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 ">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Why Choose Edumantus?
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              See how we compare to other mental health platforms and discover why thousands of people trust us with their mental well-being.
            </p>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-lg">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-4 px-6 text-left text-gray-600 font-medium">Features</th>
                    {competitors.map((competitor) => (
                      <th
                        key={competitor.name}
                        className={`py-4 px-6 text-left ${
                          competitor.highlight ? 'bg-blue-50' : ''
                        }`}
                      >
                        <h3 className={`text-xl font-bold ${
                          competitor.highlight ? 'text-blue-600' : 'text-gray-900'
                        }`}>
                          {competitor.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {competitor.description}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(competitors[0].features).map((feature, index) => (
                    <tr
                      key={feature}
                      className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                    >
                      <td className="py-4 px-6 font-medium text-gray-900">
                        {feature}
                      </td>
                      {competitors.map((competitor) => (
                        <td
                          key={`${competitor.name}-${feature}`}
                          className={`py-4 px-6 ${
                            competitor.highlight ? 'bg-blue-50/50' : ''
                          }`}
                        >
                          <span className={
                            competitor.features[feature].startsWith('✓')
                              ? 'text-green-600'
                              : competitor.features[feature].startsWith('✗')
                              ? 'text-red-500'
                              : 'text-gray-900'
                          }>
                            {competitor.features[feature]}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Unique Features */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              What Makes Us Different
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {uniqueFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-gray-50 rounded-xl p-6 text-center transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied users who have transformed their lives with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-consultation"
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-300"
              >
                Start Your Journey
              </Link>
              <Link
                href="/pricing"
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors duration-300"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
} 