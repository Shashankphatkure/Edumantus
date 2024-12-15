import Image from 'next/image';
import Link from 'next/link';
import PageTransition from '../../components/PageTransition';

export default function ChildrenAndAdolescentIssues() {
  const serviceDetails = {
    title: "Children and Adolescent Issues",
    description: "Specialized support for young individuals facing developmental, behavioral, and emotional challenges.",
    image: "https://picsum.photos/seed/youth/1200/600",
    benefits: [
      "Age-appropriate counseling techniques",
      "Academic performance support",
      "Behavioral management strategies",
      "Social skills development",
      "Parent-child relationship enhancement",
      "Emotional regulation skills"
    ],
    conditions: [
      {
        name: "Behavioral Issues",
        description: "Support for managing challenging behaviors, ADHD, and conduct-related concerns."
      },
      {
        name: "Academic Challenges",
        description: "Help with learning difficulties, study skills, and academic stress management."
      },
      {
        name: "Emotional Well-being",
        description: "Support for anxiety, depression, and mood-related issues in young individuals."
      },
      {
        name: "Social Development",
        description: "Guidance for improving peer relationships, social skills, and self-confidence."
      }
    ],
    approach: [
      {
        title: "Initial Assessment",
        description: "Understanding the child's unique needs and challenges"
      },
      {
        title: "Parent Consultation",
        description: "Involving parents in the treatment process"
      },
      {
        title: "Tailored Intervention",
        description: "Implementing age-appropriate therapeutic techniques"
      },
      {
        title: "Progress Review",
        description: "Regular monitoring and adjustment of treatment plans"
      }
    ],
    faqs: [
      {
        question: "At what age can children start counseling?",
        answer: "We provide services for children as young as 4 years old, with age-appropriate approaches for each developmental stage."
      },
      {
        question: "How are parents involved in the process?",
        answer: "Parents are essential partners in the therapeutic process, with regular updates and guidance sessions."
      },
      {
        question: "How long do sessions typically last?",
        answer: "Sessions are typically 45 minutes, adjusted based on the child's age and attention span."
      },
      {
        question: "Do you work with schools?",
        answer: "Yes, we collaborate with schools when appropriate and with parent permission to ensure comprehensive support."
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

        {/* Benefits Section */}
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