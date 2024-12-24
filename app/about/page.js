import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  const stats = [
    { number: '75,000+', label: 'Students & Professionals Guided' },
    { number: '20+', label: 'Years Experience' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '2M+', label: 'AI Rules' },
  ];

  const values = [
    {
      title: 'Expert Team',
      description: 'Our coaches include industry-specific specialists and seasoned professionals who bring deep expertise to guide students and working professionals.',
      icon: '👥'
    },
    {
      title: 'Psychometric Excellence',
      description: 'We leverage psychometric assessments and career mapping using Two Millions powerful AI Rules and advanced personalized learning techniques.',
      icon: '🎯'
    },
    {
      title: 'Empathic Guidance',
      description: 'We deeply value and respect individuals feelings and inner aspirations, ensuring tailored support that aligns with personal goals.',
      icon: '❤️'
    },
    {
      title: 'Comprehensive Solutions',
      description: 'From academic choices to career transitions, we provide end-to-end counseling services for every stage of your journey.',
      icon: '🌟'
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

  const achievements = [
    {
      title: 'Proven Results',
      description: 'With years of proven experience, we have successfully guided over 75,000 students and professionals toward greater clarity, confidence, and long-term success. Our approach, utilizing highly reliable psychometric assessments and advanced counseling tools, has achieved an impressive 98% satisfaction rate.',
      icon: '📈'
    },
    {
      title: 'Integrity and Trust',
      description: 'We remain committed to an individuals long-term success and well-being, providing honest guidance even when it may be challenging to hear, building trust through transparency and truthfulness.',
      icon: '🤝'
    },
    {
      title: 'Authenticity',
      description: 'As a highly trusted career counseling brand, we are globally recognized and proud members of the International Association of Applied Psychology (IAAP) and the Asia Pacific Career Development Association (APCDA).',
      icon: '🏆'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Empowering Careers for 20 Years
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Guiding students, graduates, and professionals in their career journeys through expert counseling and comprehensive support.
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
            <h2 className="text-3xl font-bold mb-6 text-center">About Us</h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="mb-4">
                For over 20 years, we have been dedicated to guiding students, graduates, and professionals in their career journeys. Our team is composed of experts from diverse fields, including Psychology, Career Assessment and Profiling, Career Planning and Strategy, Academic Counseling, Study Abroad and Scholarship Counseling, and many more specialized areas.
              </p>
              <p className="mb-4">
                We are deeply passionate about helping you build a fulfilling career, leveraging both our expertise and the science of career management. Our commitment lies in supporting your short-term achievements and long-term aspirations.
              </p>
              <p>
                By helping you choose the right subjects and career paths, we aim to ensure your happiness and professional success. Our approach focuses on holistic career development and coaching, addressing every aspect of your journey rather than offering fragmented solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Vision</h2>
            <p className="text-gray-600 text-center mb-12">
              To be the leading catalyst for transformative career journeys, inspiring students and professionals to achieve their highest potential and create meaningful impacts in their chosen fields.
            </p>
            
            <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
            <p className="text-gray-600 text-center">
              To empower students and professionals by providing personalized, end-to-end career guidance and support, helping them navigate academic and professional decisions with confidence. Through a blend of scientific methodologies and empathetic mentoring, we aim to foster growth, unlock potential, and guide individuals toward fulfilling and successful careers.
            </p>
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

      {/* Prove Results Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement) => (
              <div key={achievement.title} className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                  {achievement.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
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