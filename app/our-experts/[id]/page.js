"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExpertProfile() {
  const { id } = useParams();

  const experts = {
    1: {
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
      price: "₹1,500",
      about: "Dr. Sharma is a highly experienced clinical psychologist with expertise in treating anxiety, depression, and PTSD. With over 15 years of experience, she has helped thousands of clients overcome their mental health challenges.",
      expertise: [
        "Cognitive Behavioral Therapy (CBT)",
        "Trauma-Focused Therapy",
        "Mindfulness-Based Stress Reduction",
        "Group Therapy",
        "Family Counseling"
      ],
      availability: {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "9:00 AM - 3:00 PM"
      },
      publications: [
        "Mental Health in the Digital Age (2020)",
        "Understanding Anxiety Disorders (2018)",
        "Modern Approaches to Depression Treatment (2016)"
      ]
    },
    2: {
      id: 2,
      name: "Dr. Patel",
      role: "Psychiatrist",
      image: "https://picsum.photos/seed/expert2/400/500",
      specialties: ["Bipolar Disorder", "Schizophrenia", "OCD"],
      experience: "12+ Years",
      education: "MD in Psychiatry, AIIMS Delhi",
      languages: ["English", "Hindi", "Gujarati"],
      rating: 4.8,
      totalConsultations: 1200,
      price: "₹2,000",
      about: "Dr. Patel is a renowned psychiatrist specializing in severe mental health conditions. With extensive experience at leading institutions, she brings a comprehensive approach to mental health treatment.",
      expertise: [
        "Medication Management",
        "Psychotic Disorders",
        "Mood Disorders",
        "Anxiety Disorders",
        "Addiction Psychiatry"
      ],
      availability: {
        monday: "10:00 AM - 6:00 PM",
        tuesday: "10:00 AM - 6:00 PM",
        wednesday: "10:00 AM - 6:00 PM",
        thursday: "10:00 AM - 6:00 PM",
        saturday: "9:00 AM - 2:00 PM"
      },
      publications: [
        "Modern Psychiatric Interventions (2021)",
        "Bipolar Disorder: A Comprehensive Guide (2019)",
        "Schizophrenia Treatment Approaches (2017)"
      ],
      awards: [
        "Best Psychiatrist Award - Indian Psychiatric Society 2020",
        "Healthcare Excellence Award 2019",
        "Research Recognition Award - AIIMS 2018"
      ]
    },
    // ... (add more experts as needed)
  };

  const expert = experts[id];

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
                <span>{expert.totalConsultations}+ consultations</span>
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
                <h2 className="text-2xl font-bold mb-4">Expertise</h2>
                <ul className="space-y-2">
                  {expert.expertise.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-blue-600">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Publications</h2>
                <ul className="space-y-2">
                  {expert.publications.map((publication) => (
                    <li key={publication} className="flex items-center gap-2">
                      <span className="text-blue-600">📚</span>
                      <span>{publication}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add Awards Section */}
              {expert.awards && (
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">Awards & Recognition</h2>
                  <ul className="space-y-2">
                    {expert.awards.map((award) => (
                      <li key={award} className="flex items-center gap-2">
                        <span className="text-blue-600">🏆</span>
                        <span>{award}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    href={`/book-consultation?expert=${expert.id}`}
                    className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
                  >
                    Book Appointment
                  </Link>
                  <button
                    onClick={() => window.open(`tel:+1234567890`)}
                    className="block w-full border-2 border-blue-600 text-blue-600 text-center px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
                  >
                    Call Now
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Availability</h3>
                <div className="space-y-2">
                  {Object.entries(expert.availability).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="capitalize">{day}</span>
                      <span className="text-gray-600">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Languages</h3>
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

              {/* Add Reviews Summary */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Patient Reviews</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl font-bold text-blue-600">{expert.rating}</div>
                  <div>
                    <div className="flex text-yellow-400 mb-1">
                      {'★'.repeat(Math.floor(expert.rating))}
                      {'☆'.repeat(5 - Math.floor(expert.rating))}
                    </div>
                    <div className="text-gray-600 text-sm">
                      Based on {expert.totalConsultations} consultations
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Experts Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8">Similar Experts</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(experts)
              .filter(e => e.id !== expert.id)
              .slice(0, 3)
              .map(similarExpert => (
                <Link
                  key={similarExpert.id}
                  href={`/our-experts/${similarExpert.id}`}
                  className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16">
                      <Image
                        src={similarExpert.image}
                        alt={similarExpert.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{similarExpert.name}</h3>
                      <p className="text-gray-600 text-sm">{similarExpert.role}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
} 