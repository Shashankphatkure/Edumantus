import Image from 'next/image';
import Link from 'next/link';
import PageTransition from '../components/PageTransition';

export default function Services() {
  const services = [
    {
      title: "Clinical Issues",
      description: "Expert support for anxiety, depression, OCD, and other mental health conditions.",
      image: "https://picsum.photos/seed/clinical/800/600",
      features: [
        "Expert clinical assessment",
        "Evidence-based treatment",
        "Personalized care plans",
        "Regular progress monitoring"
      ],
      price: "₹2,000",
      duration: "60 minutes",
      link: "/services/clinical-issues"
    },
    {
      title: "Relationship Issues",
      description: "Professional guidance for all types of relationships and interpersonal dynamics.",
      image: "https://picsum.photos/seed/relationship/800/600",
      features: [
        "Relationship assessment",
        "Communication improvement",
        "Conflict resolution",
        "Trust building"
      ],
      price: "₹2,000",
      duration: "90 minutes",
      link: "/services/relationship-issues"
    },
    {
      title: "Children and Adolescent Issues",
      description: "Specialized support for young individuals facing developmental and emotional challenges.",
      image: "https://picsum.photos/seed/youth/800/600",
      features: [
        "Age-appropriate counseling",
        "Behavioral management",
        "Academic support",
        "Parent consultation"
      ],
      price: "₹1,800",
      duration: "45 minutes",
      link: "/services/children-and-adolescent-issues"
    },
    {
      title: "Women Centric Issues",
      description: "Dedicated support for women's mental health and life challenges.",
      image: "https://picsum.photos/seed/women/800/600",
      features: [
        "Gender-sensitive approach",
        "Life transition support",
        "Personal empowerment",
        "Work-life balance"
      ],
      price: "₹1,800",
      duration: "60 minutes",
      link: "/services/women-centric-issues"
    },
    {
      title: "Life Style Issues",
      description: "Guidance for maintaining balance and well-being in your daily life.",
      image: "https://picsum.photos/seed/lifestyle/800/600",
      features: [
        "Stress management",
        "Health optimization",
        "Time management",
        "Habit formation"
      ],
      price: "₹1,500",
      duration: "60 minutes",
      link: "/services/life-style-issues"
    },
    {
      title: "Self-Improvement",
      description: "Programs to enhance personal growth, confidence, and self-awareness.",
      image: "https://picsum.photos/seed/improvement/800/600",
      features: [
        "Goal setting",
        "Confidence building",
        "Personal development",
        "Skill enhancement"
      ],
      price: "₹1,500",
      duration: "60 minutes",
      link: "/services/self-improvement"
    },
    {
      title: "Workplace Issues",
      description: "Support for career development and workplace challenges.",
      image: "https://picsum.photos/seed/workplace/800/600",
      features: [
        "Career guidance",
        "Leadership development",
        "Stress management",
        "Work relationships"
      ],
      price: "₹2,000",
      duration: "60 minutes",
      link: "/services/workplace-issues"
    },
    {
      title: "Higher Education and Coaching",
      description: "Specialized guidance for academic excellence and career advancement.",
      image: "https://picsum.photos/seed/education/800/600",
      features: [
        "Academic counseling",
        "Career planning",
        "Test preparation",
        "Admission guidance"
      ],
      price: "₹1,800",
      duration: "60 minutes",
      link: "/services/higher-education-and-coaching"
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
                Our Mental Health Services
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Comprehensive mental health care services tailored to your needs. 
                Choose from our range of professional therapeutic services.
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