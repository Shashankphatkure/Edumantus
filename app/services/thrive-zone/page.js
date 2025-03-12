import Image from 'next/image';
import Link from 'next/link';
import PageTransition from '../../components/PageTransition';

export default function ThriveZone() {
  const serviceDetails = {
    title: "The Thrive Zone (Working Professionals)",
    description: "Expert career counseling for working professionals seeking growth, transition, or career restart opportunities.",
    image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc",
    benefits: [
      "Career Advancement Strategy",
      "Transition Planning",
      "Professional Development",
      "Industry Analysis",
      "Leadership Development",
      "Work-Life Balance"
    ],
    conditions: [
      {
        name: "Career Growth",
        description: "Strategic guidance for career advancement, leadership development, and professional growth opportunities."
      },
      {
        name: "Career Transition",
        description: "Expert support for career changes, industry switches, and role transitions with minimal disruption."
      },
      {
        name: "Skill Enhancement",
        description: "Identification and development of critical skills needed for career progression and market competitiveness."
      },
      {
        name: "Professional Branding",
        description: "Personal branding strategies, networking guidance, and professional presence enhancement."
      }
    ],
    approach: [
      {
        title: "Assessment",
        description: "Evaluate current position and career aspirations"
      },
      {
        title: "Strategy",
        description: "Develop tailored career advancement plan"
      },
      {
        title: "Execution",
        description: "Implement strategic career moves"
      },
      {
        title: "Growth",
        description: "Monitor progress and adjust strategies"
      }
    ],
    faqs: [
      {
        question: "How do you help with career transitions?",
        answer: "We provide comprehensive support including skills assessment, market analysis, and strategic planning to ensure smooth career transitions."
      },
      {
        question: "What if I'm returning after a career break?",
        answer: "We offer specialized guidance for professionals returning to work, including skill updates, confidence building, and market re-entry strategies."
      },
      {
        question: "Do you provide industry-specific guidance?",
        answer: "Yes, our counselors have extensive knowledge of various industries and provide targeted advice based on your sector of interest."
      },
      {
        question: "How long does the counseling process take?",
        answer: "The duration varies based on your goals, typically ranging from 2-3 months for comprehensive career development support."
      }
    ]
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] bg-gradient-to-r from-blue-600 to-indigo-600">
          <Image
            src={serviceDetails.image}
            alt={serviceDetails.title}
            fill
            className="object-cover mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  {serviceDetails.title}
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  {serviceDetails.description}
                </p>
                <Link
                  href="/book-consultation"
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 inline-block"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>

        

        {/* Key Benefits */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Key Benefits</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceDetails.benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <p className="text-gray-700 font-medium">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Areas We Address */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Areas We Address</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {serviceDetails.conditions.map((condition, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-4">{condition.name}</h3>
                  <p className="text-gray-600">{condition.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Our Approach</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {serviceDetails.approach.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-white">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {serviceDetails.faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                    <h3 className="text-xl font-semibold mb-4">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

{/* CTA Section */}
<section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Advance Your Career?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Take the first step towards your professional growth today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-consultation"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
              >
                Book Your Consultation
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
