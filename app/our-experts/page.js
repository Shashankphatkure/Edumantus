"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function OurExperts() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    try {
      console.log('Fetching experts...');
      const { data, error } = await supabase
        .from('experts')
        .select('*')
        

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        console.log('No experts found in the database');
      } else {
        console.log('Found experts:', data);
      }

      setExperts(data || []);
    } catch (error) {
      console.error('Error in fetchExperts:', error);
    } finally {
      setLoading(false);
    }
  };

  const allSpecialties = [...new Set(experts.flatMap(expert => expert.specialties))];

  const filteredExperts = experts.filter(expert => {
    const matchesSpecialty = selectedSpecialty === 'all' || expert.specialties.includes(selectedSpecialty);
    const matchesSearch = expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expert.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expert.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSpecialty && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Our Career Guidance Experts
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Connect with India's leading career guidance experts, bringing years of experience and personalized insights to help you navigate your career path and achieve your professional goals.
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
            
          </div>
        </div>
      </section>

      {/* Experts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {filteredExperts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No experts found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExperts.map((expert) => (
                <div
                  key={expert.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-80">
                    <Link href={`/our-experts/${expert.id}`}>
                      <Image
                        src={expert.image || '/default-expert-image.jpg'} // Add a default image
                        alt={expert.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-1">{expert.name}</h3>
                        <p className="text-gray-200 mb-2">  <span className="text-yellow-400">★ </span>{expert.rating || '4.5'} • {expert.experience}</p>
                        
                      </div>
                    </Link>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <p className="text-gray-600 mb-1">Area of Expertise</p>
                      <p className="font-medium">{expert.education}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-2">Languages</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm">Hindi</span>
                        <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm">English</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <p className="text-gray-600">Consultation Fee</p>
                        <p className="text-xl font-bold text-blue-600">₹{expert.price}</p>
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
          )}
        </div>
      </section>
    </div>
  );
} 