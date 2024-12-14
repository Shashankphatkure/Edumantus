import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  const stats = [
    { number: '10,000+', label: 'Clients Helped' },
    { number: '500+', label: 'Expert Therapists' },
    { number: '15+', label: 'Years Experience' },
    { number: '4.9/5', label: 'Client Satisfaction' },
  ];

  const values = [
    {
      title: 'Empathy First',
      description: 'We believe in understanding and sharing the feelings of our clients, creating a safe and supportive environment.',
      icon: '❤️'
    },
    {
      title: 'Professional Excellence',
      description: 'Our team consists of highly qualified professionals committed to delivering the best mental health care.',
      icon: '🎯'
    },
    {
      title: 'Confidentiality',
      description: 'We maintain the highest standards of privacy and confidentiality in all our client interactions.',
      icon: '🔒'
    },
    {
      title: 'Accessibility',
      description: 'Making mental health care accessible to everyone through our online platform and flexible scheduling.',
      icon: '🌐'
    },
  ];

  const team = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Founder & Chief Psychiatrist',
      image: 'https://picsum.photos/seed/founder/400/400',
      description: '20+ years of experience in mental health care. Pioneer in online therapy in India.'
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'Clinical Director',
      image: 'https://picsum.photos/seed/director/400/400',
      description: 'Specialist in cognitive behavioral therapy with 15+ years of experience.'
    },
    {
      name: 'Dr. Amit Patel',
      role: 'Head of Research',
      image: 'https://picsum.photos/seed/research/400/400',
      description: 'Leading research in mental health treatments and therapy effectiveness.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Edumantus
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Transforming mental health care in India through professional expertise,
              compassion, and innovative technology.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 -mt-16 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="mb-4">
                Founded in 2008, Edumantus began with a simple mission: to make quality mental health care accessible to everyone in India. What started as a small clinic in Mumbai has grown into one of India's leading online mental health platforms.
              </p>
              <p className="mb-4">
                Our journey has been driven by the belief that everyone deserves access to professional mental health support. By combining traditional therapeutic approaches with modern technology, we've created a platform that brings expert care right to your home.
              </p>
              <p>
                Today, we're proud to have helped thousands of individuals across India achieve better mental health and wellness. Our team of experienced professionals continues to grow, bringing diverse expertise and perspectives to our practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-gray-200">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Us in Our Mission
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Be part of our journey to transform mental health care in India.
              Start your wellness journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-consultation"
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
              >
                Book a Consultation
              </Link>
              <Link
                href="/careers"
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Join Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 