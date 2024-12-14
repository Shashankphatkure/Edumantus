"use client";

import { useState } from 'react';
import Image from 'next/image';
import PageTransition from '../components/PageTransition';

export default function Careers() {
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const departments = [
    'All',
    'Clinical',
    'Technology',
    'Operations',
    'Marketing',
    'Customer Support'
  ];

  const benefits = [
    {
      title: "Health & Wellness",
      icon: "🏥",
      items: [
        "Comprehensive health insurance",
        "Mental health support",
        "Wellness programs",
        "Annual health checkups"
      ]
    },
    {
      title: "Work-Life Balance",
      icon: "⚖️",
      items: [
        "Flexible working hours",
        "Remote work options",
        "Unlimited paid time off",
        "Sabbatical opportunities"
      ]
    },
    {
      title: "Growth & Development",
      icon: "📈",
      items: [
        "Learning & development budget",
        "Conference attendance",
        "Mentorship programs",
        "Career progression framework"
      ]
    },
    {
      title: "Financial Benefits",
      icon: "💰",
      items: [
        "Competitive salary",
        "Performance bonuses",
        "Stock options",
        "Retirement benefits"
      ]
    }
  ];

  const jobs = [
    {
      title: "Senior Psychiatrist",
      department: "Clinical",
      location: "Mumbai",
      type: "Full-time",
      experience: "5+ years",
      description: "Join our team of mental health professionals to provide online consultations and therapy sessions."
    },
    {
      title: "Full Stack Developer",
      department: "Technology",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      description: "Help build and maintain our next-generation mental health platform using modern technologies."
    },
    {
      title: "Clinical Operations Manager",
      department: "Operations",
      location: "Delhi",
      type: "Full-time",
      experience: "4+ years",
      description: "Oversee the smooth operation of our clinical services and ensure quality care delivery."
    },
    {
      title: "Digital Marketing Specialist",
      department: "Marketing",
      location: "Bangalore",
      type: "Full-time",
      experience: "2+ years",
      description: "Drive our digital marketing initiatives and help reach more people in need of mental health support."
    },
    {
      title: "Customer Support Lead",
      department: "Customer Support",
      location: "Hybrid",
      type: "Full-time",
      experience: "3+ years",
      description: "Lead our support team in providing exceptional service to our users and therapists."
    }
  ];

  const filteredJobs = selectedDepartment === 'All' 
    ? jobs 
    : jobs.filter(job => job.department === selectedDepartment);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Join Our Mission
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Help us make mental healthcare accessible to millions of people
              </p>
              <a
                href="#openings"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
              >
                View Open Positions
              </a>
            </div>
          </div>
        </section>

        {/* Culture Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Our Culture</h2>
              <p className="text-gray-600 text-lg">
                We're building a diverse, inclusive workplace where everyone can thrive
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="https://picsum.photos/seed/culture1/800/600"
                  alt="Team Culture"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-6">What Makes Us Different</h3>
                <ul className="space-y-4">
                  {[
                    "Mission-driven organization",
                    "Focus on innovation and impact",
                    "Collaborative work environment",
                    "Emphasis on personal growth",
                    "Work-life balance"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Benefits & Perks</h2>
              <p className="text-gray-600 text-lg">
                We take care of our team so they can focus on taking care of others
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                  <ul className="space-y-2">
                    {benefit.items.map((item, idx) => (
                      <li key={idx} className="text-gray-600">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Job Openings Section */}
        <section id="openings" className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Open Positions</h2>
              
              {/* Department Filter */}
              <div className="flex flex-wrap gap-4 mb-8">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDepartment(dept)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedDepartment === dept
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>

              {/* Job Listings */}
              <div className="space-y-6">
                {filteredJobs.map((job, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            {job.department}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            {job.type}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            {job.experience}
                          </span>
                        </div>
                      </div>
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300">
                        Apply Now
                      </button>
                    </div>
                    <p className="text-gray-600">{job.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Our Hiring Process</h2>
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  {
                    step: "Application",
                    description: "Submit your resume and cover letter",
                    icon: "📝"
                  },
                  {
                    step: "Initial Call",
                    description: "Brief discussion about your experience and expectations",
                    icon: "📞"
                  },
                  {
                    step: "Technical Round",
                    description: "In-depth discussion about your skills and expertise",
                    icon: "💻"
                  },
                  {
                    step: "Final Interview",
                    description: "Meet the team and discuss next steps",
                    icon: "🤝"
                  }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.step}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Make an Impact?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join us in our mission to make mental healthcare accessible to everyone
              </p>
              <a
                href="#openings"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
              >
                View Open Positions
              </a>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
} 