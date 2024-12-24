import Image from 'next/image';
import Link from 'next/link';
import PageTransition from '../../components/PageTransition';

export default function Pathfinders() {
  const serviceDetails = {
    title: "Pathfinders (8th-12th Grade)",
    description: "Comprehensive career guidance and counseling services for school students to make informed decisions about their academic and professional future.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
    benefits: [
      "Stream Selection Guidance (8th-10th)",
      "Career Counseling (11th-12th)",
      "Psychological Support",
      "Scientific Assessment Tools",
      "Personalized Action Plans",
      "Parent Consultation Sessions"
    ],
    conditions: [
      {
        name: "Stream Selection Guidance",
        description: "Expert guidance for students in classes 8th-10th to make informed decisions about their future study streams using scientific assessment tools."
      },
      {
        name: "Career Counseling",
        description: "Comprehensive career guidance for 11th-12th students, helping them explore and identify suitable career options based on their interests and aptitude."
      },
      {
        name: "Psychological Support",
        description: "Professional counseling to help students manage academic stress, anxiety, and other emotional challenges."
      },
      {
        name: "Academic Planning",
        description: "Strategic academic planning and guidance for optimal performance and goal achievement."
      }
    ],
    approach: [
      {
        title: "Assessment",
        description: "Scientific evaluation of interests, aptitude, and potential"
      },
      {
        title: "Analysis",
        description: "In-depth analysis of assessment results"
      },
      {
        title: "Guidance",
        description: "Personalized counseling and recommendations"
      },
      {
        title: "Action Plan",
        description: "Detailed roadmap for academic and career success"
      }
    ],
    faqs: [
      {
        question: "How do you assess student potential?",
        answer: "We use scientifically validated assessment tools to evaluate interests, aptitude, and personality traits."
      },
      {
        question: "Do parents need to be involved?",
        answer: "Yes, we encourage parent participation in the counseling process to ensure comprehensive support."
      },
      {
        question: "How long is the counseling process?",
        answer: "The basic program includes 3-4 sessions spread over 2-3 weeks, with follow-up support as needed."
      },
      {
        question: "What if my child is unsure about their interests?",
        answer: "Our assessment tools and counseling process helps students discover and clarify their interests and strengths."
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
            <h2 className="text-3xl font-bold mb-8">Ready to Support Your Child's Growth?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Take the first step towards your child's well-being today.
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
