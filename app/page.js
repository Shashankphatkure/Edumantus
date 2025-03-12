"use client";

import Image from "next/image";
import Link from "next/link";
import PageTransition from "./components/PageTransition";
import { useState, useEffect } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [featuredExperts, setFeaturedExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 768);
  const [currentExpertPage, setCurrentExpertPage] = useState(0);
  const [autoSlideExperts, setAutoSlideExperts] = useState(true);

  const services = [
    {
      title: "Pathfinders (8th-12th Grade)",
      description: "Comprehensive career guidance and counseling services for school students to make informed decisions about their academic and professional future.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
      link: "/services/pathfinders"
    },
    {
      title: "The Trailblazers (College Students)",
      description: "Specialized career guidance for college students to navigate opportunities and make informed decisions about their professional future.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
      link: "/services/trailblazers"
    },
    {
      title: "The Thrive Zone (Working Professionals)",
      description: "Expert career counseling for working professionals seeking growth, transition, or career restart opportunities.",
      image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc",
      link: "/services/thrive-zone"
    },
    {
      title: "Psychometric Assessment",
      description: "Comprehensive career testing and personality assessment to identify your strengths and ideal career paths.",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2",
      link: "/services/psychometric-assessment"
    },
    {
      title: "Admission Assistance",
      description: "Expert guidance for college admissions, course selection, and application processes.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
      link: "/services/admission-assistance"
    },
    {
      title: "Professional Development",
      description: "Complete career enhancement services for working professionals, including resume optimization and interview coaching.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
      link: "/services/professional-development"
    }
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % services.length);
      }, 5000); // Change slide every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, services.length]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Modify the slide calculation to handle mobile
  const nextSlide = () => {
    const totalSlides = windowWidth >= 768 ? Math.ceil(services.length / 3) : services.length;
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    const totalSlides = windowWidth >= 768 ? Math.ceil(services.length / 3) : services.length;
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    const totalSlides = windowWidth >= 768 ? Math.ceil(services.length / 3) : services.length;
    if (index < totalSlides) {
      setCurrentSlide(index);
      setIsAutoPlaying(false);
    }
  };

  useEffect(() => {
    fetchFeaturedExperts();
  }, []);

  const fetchFeaturedExperts = async () => {
    try {
      const { data, error } = await supabase
        .from('experts')
        .select('*')
        .eq('status', 'active')
        .order('rating', { ascending: false });

      if (error) throw error;
      setFeaturedExperts(data);
    } catch (error) {
      console.error('Error fetching experts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add this function to calculate visible experts
  const getVisibleExperts = () => {
    const expertsPerPage = 3;
    const start = currentExpertPage * expertsPerPage;
    return featuredExperts.slice(start, start + expertsPerPage);
  };

  // Add useEffect for auto-sliding
  useEffect(() => {
    let interval;
    if (autoSlideExperts) {
      interval = setInterval(() => {
        const totalPages = Math.ceil(featuredExperts.length / 3);
        setCurrentExpertPage((prev) => (prev + 1) % totalPages);
      }, 5000); // Changes every 5 seconds
    }
    return () => clearInterval(interval);
  }, [autoSlideExperts, featuredExperts.length]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-700 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjMDAwIiBvcGFjaXR5PSIuMDUiIHdpZHRoPSIxNDQwIiBoZWlnaHQ9Ijc2MCIvPjxwYXRoIGQ9Ik03MjAgMGw3MjAgNzYwSDBMNzIwIDB6IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 relative">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="space-y-6 sm:space-y-8 animate-fade-in-up text-center md:text-left">
                <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium inline-block backdrop-blur-sm">
                  #1 Career counselling Platform in India
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Empower Your Career Journey for Greater Success
                </h1>
                <p className="text-lg sm:text-xl text-blue-100 leading-relaxed">
                  Connect with India's top career counselling for personalized
                  consultation and guidance, all from the comfort of your home.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link 
                    href="/book-consultation"
                    className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center w-full sm:w-auto"
                  >
                    Book Consultation
                  </Link>
                  <Link
                    href="/our-experts"
                    className="border-2 border-white/30 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105 text-center w-full sm:w-auto"
                  >
                    Meet Our Experts
                  </Link>
                </div>
              </div>
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full animate-fade-in mt-8 md:mt-0">
                <Image
                  src="/6671.jpg"
                  alt="Online Consultation"
                  fill
                  className="rounded-2xl shadow-2xl object-cover transform hover:scale-105 transition-transform duration-500 ease-in-out"
                  priority
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 -mt-16 relative z-10">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {[
                { number: '10,000+', label: 'Happy Clients' },
                { number: '500+', label: 'Expert Counsellors' },
                { number: '4.9/5', label: 'Client Rating' },
                { number: '24/7', label: 'Support Available' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">{stat.number}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section - NEW */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Benefits of Online Career Counselling
              </h2>
              <p className="text-gray-600 text-lg">
                Experience the advantages of professional career guidance from the comfort of your home
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Convenience & Accessibility',
                  description: 'Access career guidance from anywhere, anytime. No commute, no waiting rooms.',
                  icon: '🏠'
                },
                {
                  title: 'Complete Privacy',
                  description: 'Confidential sessions in the comfort of your personal space, secured with end-to-end encryption.',
                  icon: '🔒'
                },
                {
                  title: 'Affordable Solution',
                  description: 'Affordable career counseling services with flexible payment options, offering the best solutions tailored to your needs.',
                  icon: '💰'
                },
                {
                  title: 'Choice of Expert',
                  description: 'Choose the perfect mentor from a diverse pool of qualified career experts, tailored to your specific goals and needs.',
                  icon: '👥'
                },
                {
                  title: 'Flexible Scheduling',
                  description: 'Schedule sessions at your convenience, with options available for evenings and weekends.',
                  icon: '📅'
                },
                {
                  title: 'Continuous Guidance',
                  description: '24/7 chat support to ensure personalized and ongoing career guidance.',
                  icon: '🤝'
                }
              ].map((benefit) => (
                <div key={benefit.title} 
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specialties Section */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Our Specialties
              </h2>
              <p className="text-gray-600 text-lg">
                Expert guidance for every aspect of your mental well-being
              </p>
            </div>
            
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-1"
                >
                  <div className="relative h-48 sm:h-52">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                    <h3 className="absolute bottom-4 left-4 text-lg sm:text-xl font-bold text-white group-hover:translate-x-1 transition-transform duration-300">
                      {service.title}
                    </h3>
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="text-gray-600 text-sm mb-4 sm:mb-5 line-clamp-3">
                      {service.description}
                    </p>
                    <Link
                      href={service.link}
                      className="inline-flex items-center bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all duration-300 group-hover:translate-x-1"
                    >
                      Learn More 
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section - NEW */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Why Choose Edmantus?
              </h2>
              <p className="text-gray-600 text-lg">
                Leading the way in online career counselling with our unique advantages
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Verified Professionals',
                  description: 'All our therapists are thoroughly vetted with minimum 8 years of experience',
                  icon: '✓'
                },
                {
                  title: 'Personalized Matching',
                  description: 'AI-powered algorithm to match you with the most suitable therapist',
                  icon: '✓'
                },
                {
                  title: 'Multi-lingual Sessions',
                  description: 'Counseling available in Hindi, English, and other regional languages',
                  icon: '✓'
                },
                {
                  title: 'Secure Platform',
                  description: 'HIPAA compliant platform with complete data privacy',
                  icon: '✓'
                },
                {
                  title: 'Flexible Plans',
                  description: 'Choose from various subscription plans that fit your needs',
                  icon: '✓'
                },
                {
                  title: 'Quality Assurance',
                  description: 'Regular quality checks and client feedback monitoring',
                  icon: '✓'
                }
              ].map((feature) => (
                <div key={feature.title} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                How It Works
              </h2>
              <p className="text-gray-600 text-lg">
                Simple steps to begin your career transformation journey
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  step: 'Choose Your Expert',
                  description: 'Browse through our verified experts and find your perfect match',
                  icon: '👨‍⚕️'
                },
                {
                  step: 'Book a Time Slot',
                  description: 'Select a convenient time that works best for you',
                  icon: '📅'
                },
                {
                  step: 'Make Payment',
                  description: 'Secure payment options for peace of mind',
                  icon: '💳'
                },
                {
                  step: 'Start Consultation',
                  description: 'Begin your journey to a fulfilling career with expert guidance and support',
                  icon: '🎯'
                }
              ].map((item, index) => (
                <div key={item.step} className="text-center group">
                  <div className="relative mb-6 sm:mb-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-bold mx-auto mb-4 transform group-hover:rotate-6 transition-transform duration-300">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{item.step}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mental Health Resources Section - NEW */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Career Development Resources
              </h2>
              <p className="text-gray-600 text-lg">
                Access free resources to gain insights and enhance your career opportunities
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Self-Assessment Tools',
                  description: 'Take our career aptitude tests to understand your strengths better',
                  icon: '📋'
                },
                {
                  title: 'Educational Articles',
                  description: 'Expert-written articles on various career topics',
                  icon: '📚'
                },
                {
                  title: 'Career Guides',
                  description: 'Free guided career planning and development resources',
                  icon: '🎯'
                },
                {
                  title: 'Support Groups',
                  description: 'Join our moderated online career communities',
                  icon: '👥'
                }
              ].map((resource) => (
                <div key={resource.title} 
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 text-center group">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {resource.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{resource.title}</h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <Link href="/resources" className="text-blue-600 font-medium hover:text-blue-700">
                    Learn More →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Experts */}
        <section className="py-16 sm:py-20 relative">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Our Featured Experts
              </h2>
              <p className="text-gray-600 text-lg">
                Experienced professionals dedicated to your career development
              </p>
            </div>
            
            {loading ? (
              // Loading state
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                    <div className="h-64 sm:h-80 bg-gray-200"></div>
                    <div className="p-4 sm:p-6">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div 
                className="relative"
                onMouseEnter={() => setAutoSlideExperts(false)}
                onMouseLeave={() => setAutoSlideExperts(true)}
              >
                {/* Experts Grid */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 transition-all duration-500">
                  {getVisibleExperts().map((expert) => (
                    <div key={expert.id} 
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="relative h-64 sm:h-80">
                        <Image
                          src={expert.image}
                          alt={expert.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                          <h3 className="text-xl sm:text-2xl font-bold mb-2">{expert.name}</h3>
                          <p className="text-gray-200 mb-4">{expert.role} • {expert.experience}</p>
                          <div className="flex gap-2 flex-wrap">
                            {expert.specialties.map((specialty) => (
                              <span key={specialty} className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="p-4 sm:p-6">
                        <Link
                          href={`/book-consultation?expert=${expert.id}`}
                          className="block text-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                        >
                          Book Consultation
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center mt-8 gap-2">
                  {[...Array(Math.ceil(featuredExperts.length / 3))].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentExpertPage(index);
                        setAutoSlideExperts(false);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentExpertPage === index ? 'bg-blue-600 w-4' : 'bg-gray-300'
                      }`}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
            
            <div className="text-center mt-8 sm:mt-12">
              <Link
                href="/our-experts"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 border border-blue-100"
              >
                View All Experts
              </Link>
            </div>
          </div>
        </section>

        {/* Client Success Stories - NEW */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Client Success Stories
              </h2>
              <p className="text-gray-600 text-lg">
                Real transformation stories from our clients
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: 'Amit Kumar',
                  age: '32',
                  issue: 'Career Transition',
                  story: "After 6 months of counselling, I've successfully transitioned to a new career path. The guidance I received has been life-changing.",
                  improvement: '85% satisfaction with new career path',
                  imageUrl: 'https://img.freepik.com/free-photo/close-up-portrait-young-indian-man-with-beard-white-shirt-isolated-standing-smiling_155003-23823.jpg'
                },
                {
                  name: 'Neha Sharma',
                  age: '28',
                  issue: 'Career Development',
                  story: "The personalized approach and constant support helped me advance in my career. I'm now more confident and optimistic about my future.",
                  improvement: '90% improvement in career prospects',
                  imageUrl: 'https://image.tensorartassets.com/cdn-cgi/image/anim=true,plain=false,w=2048,f=jpeg,q=85/posts/images/681519462272215395/0b258e2f-9663-4b36-a1ae-29a9fcdff46c.jpg'
                }
              ].map((story, index) => (
                <div key={story.name} 
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="relative w-16 h-16 mr-4">
                      <Image
                        src={story.imageUrl}
                        alt={story.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{story.name}, {story.age}</h3>
                      <p className="text-gray-600">{story.issue}</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-600 mb-4 italic">
                    "{story.story}"
                  </blockquote>
                  <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg font-medium">
                    {story.improvement}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                What Our Clients Say
              </h2>
              <p className="text-gray-600 text-lg">
                Real stories from real people who transformed their lives
              </p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  name: 'Priya Singh',
                  location: 'Delhi',
                  testimonial: 'The consultation experience was excellent. Dr. Sharma helped me understand my challenges better and provided practical solutions.',
                  rating: 5,
                  imageUrl: 'https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg'
                },
                {
                  name: 'Rahul Verma',
                  location: 'Mumbai',
                  testimonial: "Professional and caring approach. The online sessions were very convenient and effective. I've seen remarkable improvement.",
                  rating: 5,
                  imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg'
                },
                {
                  name: 'Anjali Desai',
                  location: 'Bangalore',
                  testimonial: 'Found the perfect counselor for my needs. The booking process was simple and straightforward. Highly recommended!',
                  rating: 5,
                  imageUrl: 'https://image.cdn2.seaart.me/2024-01-16/cmjfgo5e878c73fn4a6g/17c99f27bfaa0775a576c18da720682d3cca1978_high.webp'
                }
              ].map((testimonial, index) => (
                <div key={testimonial.name} 
                  className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-6">
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 mr-4">
                      <Image
                        src={testimonial.imageUrl}
                        alt={testimonial.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-600">{testimonial.location}, India</p>
                      <div className="flex items-center mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">"{testimonial.testimonial}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjMDAwIiBvcGFjaXR5PSIuMDUiIHdpZHRoPSIxNDQwIiBoZWlnaHQ9Ijc2MCIvPjxwYXRoIGQ9Ik03MjAgMGw3MjAgNzYwSDBMNzIwIDB6IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 text-center relative">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">Ready to Start Your Journey?</h2>
              <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-12 leading-relaxed">
                Start your journey towards improved career prospects today. 
                Our experts are here to provide guidance and support at every step.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/book-consultation"
                  className="bg-white text-blue-600 px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Book Your First Consultation
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-white text-white px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
