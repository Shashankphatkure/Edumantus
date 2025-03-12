"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function ExpertProfile() {
  const { id } = useParams();
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchExpert();
  }, [id]);

  const fetchExpert = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('experts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setExpert(data);
    } catch (error) {
      console.error('Error fetching expert:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Expert Not Found</h2>
          <p className="text-gray-600 mb-6">The expert you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/our-experts"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300"
          >
            View All Experts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/our-experts" className="text-gray-600 hover:text-blue-600">Our Experts</Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-600">{expert.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src={expert.image}
                alt={expert.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">{expert.name}</h1>
              <p className="text-xl text-blue-100">{expert.role}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>{expert.rating}</span>
                </div>
                <span className="text-blue-200">•</span>
                <span>{expert.total_consultations}+ consultations</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-4">
                {expert.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="px-4 py-2 bg-white/10 rounded-full text-sm backdrop-blur-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="md:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">About</h2>
                <p className="text-gray-600 leading-relaxed">{expert.about}</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Education</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 mb-1">Graduation:</p>
                    <p className="font-medium">{expert.graduation || 'Information not available'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Post Graduation:</p>
                    <p className="font-medium">{expert.post_graduation || 'Information not available'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Others:</p>
                    <p className="font-medium">{expert.other_education || 'Information not available'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Quick Info</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600">Experience</p>
                    <p className="font-medium">{expert.experience}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Area of Expertise</p>
                    <p className="font-medium">{expert.education}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Languages</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Hindi</span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">English</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Book Consultation</h3>
                <div className="text-center mb-4">
                  <p className="text-gray-600">Consultation Fee</p>
                  <p className="text-3xl font-bold text-blue-600">₹{expert.price}</p>
                </div>
                <div className="space-y-3">
                  <Link
                    href={`/book-consultation?expert=${expert.id}`}
                    className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 