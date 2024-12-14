"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function OurExperts() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const experts = [
    {
      id: 1,
      name: "Dr. Sharma",
      role: "Clinical Psychologist",
      image: "https://picsum.photos/seed/expert1/400/500",
      specialties: ["Anxiety", "Depression", "PTSD"],
      experience: "15+ Years",
      education: "Ph.D. in Clinical Psychology",
      languages: ["English", "Hindi"],
      rating: 4.9,
      totalConsultations: 1500,
      price: "₹1,500"
    },
    {
      id: 2,
      name: "Dr. Patel",
      role: "Psychiatrist",
      image: "https://picsum.photos/seed/expert2/400/500",
      specialties: ["Bipolar Disorder", "Schizophrenia", "OCD"],
      experience: "12+ Years",
      education: "MD in Psychiatry",
      languages: ["English", "Hindi", "Gujarati"],
      rating: 4.8,
      totalConsultations: 1200,
      price: "₹2,000"
    },
    {
      id: 3,
      name: "Dr. Gupta",
      role: "Relationship Counselor",
      image: "https://picsum.photos/seed/expert3/400/500",
      specialties: ["Couples Therapy", "Family Counseling", "Marriage"],
      experience: "10+ Years",
      education: "M.Phil in Psychology",
      languages: ["English", "Hindi", "Bengali"],
      rating: 4.9,
      totalConsultations: 900,
      price: "₹1,800"
    },
    {
      id: 4,
      name: "Dr. Singh",
      role: "Child Psychologist",
      image: "https://picsum.photos/seed/expert4/400/500",
      specialties: ["Child Development", "ADHD", "Learning Disabilities"],
      experience: "8+ Years",
      education: "Ph.D. in Child Psychology",
      languages: ["English", "Hindi", "Punjabi"],
      rating: 4.7,
      totalConsultations: 800,
      price: "₹1,700"
    },
    {
      id: 5,
      name: "Dr. Kumar",
      role: "Addiction Specialist",
      image: "https://picsum.photos/seed/expert5/400/500",
      specialties: ["Substance Abuse", "Addiction Recovery", "Behavioral Addictions"],
      experience: "14+ Years",
      education: "MD in Addiction Medicine",
      languages: ["English", "Hindi", "Tamil"],
      rating: 4.9,
      totalConsultations: 1100,
      price: "₹1,900"
    },
    {
      id: 6,
      name: "Dr. Reddy",
      role: "Stress Management Expert",
      image: "https://picsum.photos/seed/expert6/400/500",
      specialties: ["Work Stress", "Anxiety", "Life Coaching"],
      experience: "11+ Years",
      education: "Ph.D. in Psychology",
      languages: ["English", "Hindi", "Telugu"],
      rating: 4.8,
      totalConsultations: 950,
      price: "₹1,600"
    }
  ];

  const allSpecialties = [...new Set(experts.flatMap(expert => expert.specialties))];

  const filteredExperts = experts.filter(expert => {
    const matchesSpecialty = selectedSpecialty === 'all' || expert.specialties.includes(selectedSpecialty);
    const matchesSearch = expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expert.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expert.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSpecialty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Our Mental Health Experts
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Connect with India's leading mental health professionals, each bringing years of experience and expertise to help you on your journey to wellness.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="w-full md:w-auto">
              <input
                type="text"
                placeholder="Search by name, role, or specialty..."
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-auto">
              <select
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                <option value="all">All Specialties</option>
                {allSpecialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Experts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperts.map((expert) => (
              <div
                key={expert.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-80">
                  <Link href={`/our-experts/${expert.id}`}>
                    <Image
                      src={expert.image}
                      alt={expert.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-1">{expert.name}</h3>
                      <p className="text-gray-200 mb-2">{expert.role} • {expert.experience}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-400">★</span>
                        <span>{expert.rating}</span>
                        <span className="text-gray-300">•</span>
                        <span>{expert.totalConsultations}+ consultations</span>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-gray-600 mb-1">Education</p>
                    <p className="font-medium">{expert.education}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-2">Specialties</p>
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
                  </div>
                  <div>
                    <p className="text-gray-600 mb-2">Languages</p>
                    <div className="flex flex-wrap gap-2">
                      {expert.languages.map((language) => (
                        <span
                          key={language}
                          className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-gray-600">Consultation Fee</p>
                      <p className="text-xl font-bold text-blue-600">{expert.price}</p>
                    </div>
                    <Link
                      href={`/book-consultation?expert=${expert.id}`}
                      className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 