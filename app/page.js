import Image from "next/image";
import Link from "next/link";
import PageTransition from "./components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-700 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjMDAwIiBvcGFjaXR5PSIuMDUiIHdpZHRoPSIxNDQwIiBoZWlnaHQ9Ijc2MCIvPjxwYXRoIGQ9Ik03MjAgMGw3MjAgNzYwSDBMNzIwIDB6IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-10"></div>
          <div className="container mx-auto px-6 py-24 relative">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 animate-fade-in-up">
                <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium inline-block backdrop-blur-sm">
                  #1 Mental Health Platform in India
                </span>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                  Your Path to Mental Wellness Begins Here
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed">
                  Connect with India's top mental health professionals for personalized
                  consultation and guidance, all from the comfort of your home.
                </p>
                <div className="flex gap-4 flex-col sm:flex-row">
                  <Link 
                    href="/book-consultation"
                    className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                  >
                    Book Consultation
                  </Link>
                  <Link
                    href="/our-experts"
                    className="border-2 border-white/30 backdrop-blur-sm px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105 text-center"
                  >
                    Meet Our Experts
                  </Link>
                </div>
              </div>
              <div className="relative h-[500px] w-full animate-fade-in">
                <Image
                  src="https://picsum.photos/seed/hero/1000/1000"
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
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '10,000+', label: 'Happy Clients' },
                { number: '500+', label: 'Expert Therapists' },
                { number: '4.9/5', label: 'Client Rating' },
                { number: '24/7', label: 'Support Available' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specialties Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Our Specialties
              </h2>
              <p className="text-gray-600 text-lg">
                Expert guidance for every aspect of your mental well-being
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Depression & Anxiety',
                  image: 'https://picsum.photos/seed/anxiety/400/300',
                  description: 'Professional support to help you overcome depression and anxiety, restoring peace to your life.'
                },
                {
                  title: 'Relationship Counseling',
                  image: 'https://picsum.photos/seed/relationship/400/300',
                  description: 'Build stronger, healthier relationships with expert guidance and proven techniques.'
                },
                {
                  title: 'Career Guidance',
                  image: 'https://picsum.photos/seed/career/400/300',
                  description: 'Navigate your career path with confidence through professional counseling and support.'
                }
              ].map((specialty) => (
                <div key={specialty.title} 
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
                  <div className="relative h-56">
                    <Image
                      src={specialty.image}
                      alt={specialty.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{specialty.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 leading-relaxed">
                      {specialty.description}
                    </p>
                    <Link href="/services" className="inline-block mt-4 text-blue-600 font-semibold hover:text-blue-700">
                      Learn More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                How It Works
              </h2>
              <p className="text-gray-600 text-lg">
                Simple steps to start your healing journey
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
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
                  description: 'Begin your journey to better mental health',
                  icon: '🎯'
                }
              ].map((item, index) => (
                <div key={item.step} className="text-center group">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-4 transform group-hover:rotate-6 transition-transform duration-300">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{item.step}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Experts */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Our Featured Experts
              </h2>
              <p className="text-gray-600 text-lg">
                Experienced professionals dedicated to your well-being
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Dr. Sharma',
                  role: 'Clinical Psychologist',
                  image: 'https://picsum.photos/seed/expert1/400/500',
                  specialties: ['Anxiety', 'Depression', 'PTSD']
                },
                {
                  name: 'Dr. Patel',
                  role: 'Psychiatrist',
                  image: 'https://picsum.photos/seed/expert2/400/500',
                  specialties: ['Bipolar Disorder', 'Schizophrenia', 'OCD']
                },
                {
                  name: 'Dr. Gupta',
                  role: 'Relationship Counselor',
                  image: 'https://picsum.photos/seed/expert3/400/500',
                  specialties: ['Couples Therapy', 'Family Counseling', 'Marriage']
                }
              ].map((expert) => (
                <div key={expert.name} 
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-80">
                    <Image
                      src={expert.image}
                      alt={expert.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{expert.name}</h3>
                      <p className="text-gray-200 mb-4">{expert.role} • 15+ Years Experience</p>
                      <div className="flex gap-2 flex-wrap">
                        {expert.specialties.map((specialty) => (
                          <span key={specialty} className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <Link
                      href="/book-consultation"
                      className="block text-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      Book Consultation
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                What Our Clients Say
              </h2>
              <p className="text-gray-600 text-lg">
                Real stories from real people who transformed their lives
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Priya Singh',
                  location: 'Delhi',
                  testimonial: 'The consultation experience was excellent. Dr. Sharma helped me understand my challenges better and provided practical solutions.',
                  rating: 5
                },
                {
                  name: 'Rahul Verma',
                  location: 'Mumbai',
                  testimonial: 'Professional and caring approach. The online sessions were very convenient and effective. Ive seen remarkable improvement.',
                  rating: 5
                },
                {
                  name: 'Anjali Desai',
                  location: 'Bangalore',
                  testimonial: 'Found the perfect counselor for my needs. The booking process was simple and straightforward. Highly recommended!',
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div key={testimonial.name} 
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-6">
                    <div className="relative w-16 h-16 mr-4">
                      <Image
                        src={`https://picsum.photos/seed/testimonial${index + 1}/200/200`}
                        alt={testimonial.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold">{testimonial.name}</h4>
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
        <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjMDAwIiBvcGFjaXR5PSIuMDUiIHdpZHRoPSIxNDQwIiBoZWlnaHQ9Ijc2MCIvPjxwYXRoIGQ9Ik03MjAgMGw3MjAgNzYwSDBMNzIwIDB6IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-10"></div>
          <div className="container mx-auto px-6 text-center relative">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Start Your Journey?</h2>
              <p className="text-xl text-blue-100 mb-12 leading-relaxed">
                Take the first step towards better mental health today. 
                Our experts are here to support you every step of the way.
              </p>
              <Link
                href="/book-consultation"
                className="inline-block bg-white text-blue-600 px-12 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Book Your First Consultation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
