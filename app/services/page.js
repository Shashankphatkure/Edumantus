import Image from 'next/image';
import Link from 'next/link';
import PageTransition from '../components/PageTransition';

export default function Services() {
  const services = [
    {
      title: "Pathfinders (8th-12th Grade)",
      description: "Comprehensive career guidance and counseling services for school students to make informed decisions about their academic and professional future.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
      features: [
        "Stream Selection Guidance (8th-10th)",
        "Career Counseling (11th-12th)",
        "Psychological Support",
        "Scientific Assessment Tools"
      ],
      price: "₹2,000",
      duration: "60 minutes",
      link: "/services/pathfinders"
    },
    {
      title: "The Trailblazers (College Students)",
      description: "Specialized career guidance for college students to navigate opportunities and make informed decisions about their professional future.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
      features: [
        "Career Path Planning",
        "Skills Assessment",
        "Industry Insights",
        "Academic Guidance"
      ],
      price: "₹2,000",
      duration: "60 minutes",
      link: "/services/trailblazers"
    },
    {
      title: "The Thrive Zone (Working Professionals)",
      description: "Expert career counseling for working professionals seeking growth, transition, or career restart opportunities.",
      image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc",
      features: [
        "Career Advancement Strategy",
        "Transition Planning",
        "Professional Development",
        "Industry Analysis"
      ],
      price: "₹2,500",
      duration: "60 minutes",
      link: "/services/thrive-zone"
    },
    {
      title: "Psychometric Assessment",
      description: "Comprehensive career testing and personality assessment to identify your strengths and ideal career paths.",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2",
      features: [
        "Career Aptitude Testing",
        "Personality Assessment",
        "Detailed Reports",
        "Expert Analysis"
      ],
      price: "₹3,000",
      duration: "90 minutes",
      link: "/services/psychometric-assessment"
    },
    {
      title: "Admission Assistance",
      description: "Expert guidance for college admissions, course selection, and application processes.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
      features: [
        "College Selection",
        "Application Support",
        "Document Review",
        "Interview Preparation"
      ],
      price: "₹2,000",
      duration: "60 minutes",
      link: "/services/admission-assistance"
    },
    {
      title: "Professional Development",
      description: "Comprehensive services for career enhancement including resume writing and interview preparation.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
      features: [
        "Resume Writing",
        "Interview Skills",
        "Personal Branding",
        "Communication Skills"
      ],
      price: "₹1,800",
      duration: "60 minutes",
      link: "/services/professional-development"
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Career Guidance & Counseling Services
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Expert career guidance and counseling services for students and professionals at every stage of their journey.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <Link href={service.link} className="block">
                    <div className="relative h-48">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white">
                        {service.title}
                      </h3>
                    </div>
                  </Link>
                  <div className="p-6 flex-grow flex flex-col">
                    <p className="text-gray-600 mb-6">
                      {service.description}
                    </p>
                    <div className="space-y-4 mb-6">
                      <p className="font-semibold text-gray-900">Key Features:</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-gray-600">
                            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-auto">
                      <div className="flex items-center justify-between pb-4 border-b">
                        <div>
                          <p className="text-gray-600">Session Fee</p>
                          <p className="text-2xl font-bold text-blue-600">{service.price}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600">Duration</p>
                          <p className="font-semibold">{service.duration}</p>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Link
                          href={service.link}
                          className="block text-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Not Sure Which Service to Choose?
              </h2>
              <p className="text-gray-600 mb-8">
                Schedule a free 15-minute consultation with our team to discuss your needs 
                and find the best service for you.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
} 