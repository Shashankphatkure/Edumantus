"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: "General Questions",
      questions: [
        {
          q: "What is online career counselling?",
          a: "Online career counselling is a secure, confidential way to connect with licensed career counsellors through video calls, voice calls, or chat. It provides the same quality of guidance as in-person sessions but with added convenience and accessibility."
        },
        {
          q: "Is online counselling as effective as in-person counselling?",
          a: "Yes, research shows that online counselling can be just as effective as in-person counselling. It offers the same level of professional guidance while providing additional benefits like convenience, accessibility, and comfort of receiving care from your own space."
        },
        {
          q: "When should I seek career counselling?",
          a: "Consider seeking career counselling if you're facing career-related decisions, feeling stuck in your current role, planning a career transition, or need guidance in your professional development. It's beneficial at any stage of your career journey."
        }
      ]
    },
    {
      category: "Student Services",
      questions: [
        {
          q: "When should I start the admission process?",
          a: "It's recommended to start at least 6-8 months before application deadlines to ensure thorough preparation."
        },
        {
          q: "Do you help with scholarship applications?",
          a: "Yes, we provide guidance on scholarship opportunities and assist with scholarship applications."
        },
        {
          q: "What documents do I need for college applications?",
          a: "Required documents typically include academic transcripts, standardized test scores, letters of recommendation, and personal statements."
        },
        {
          q: "How do you help with college selection?",
          a: "We analyze your academic profile, interests, and career goals to recommend colleges that best match your requirements."
        }
      ]
    },
    {
      category: "Professional Development",
      questions: [
        {
          q: "How do you help with resume writing?",
          a: "We provide comprehensive resume writing services including content optimization, formatting, and ATS compatibility."
        },
        {
          q: "What types of interview preparation do you offer?",
          a: "We offer mock interviews, feedback sessions, and coaching for various interview types including behavioral and technical interviews."
        },
        {
          q: "How can you assist with building my personal brand?",
          a: "We assist in crafting a strong professional identity by optimizing your LinkedIn profile, developing effective networking strategies, and enhancing your overall online presence to ensure you stand out in your industry."
        },
        {
          q: "What is leadership development training?",
          a: "Leadership development training is a tailored program designed to enhance key leadership skills such as effective communication, decision-making, problem-solving, and the ability to inspire and lead teams. This training helps professionals grow their leadership capabilities to thrive in managerial or leadership roles."
        },
        {
          q: "What makes this leadership development training unique?",
          a: "This training is personalized to meet your specific professional goals, focusing not only on traditional leadership qualities but also on developing emotional intelligence, fostering collaboration, and enhancing your overall workplace presence. We use a mix of coaching, feedback, and hands-on practice to ensure lasting development."
        }
      ]
    },
    {
      category: "Career Transition",
      questions: [
        {
          q: "How do you help with career transitions?",
          a: "We provide comprehensive support including skills assessment, market analysis, and strategic planning to ensure smooth career transitions."
        },
        {
          q: "What if I'm returning after a career break?",
          a: "We offer specialized guidance for professionals returning to work, including skill updates, confidence building, and market re-entry strategies."
        },
        {
          q: "Do you provide industry-specific guidance?",
          a: "Yes, our counselors have extensive knowledge of various industries and provide targeted advice based on your sector of interest."
        },
        {
          q: "How long does the counselling process take?",
          a: "The duration varies based on your goals, typically ranging from 2-3 months for comprehensive career development support."
        }
      ]
    },
    {
      category: "Assessment & Testing",
      questions: [
        {
          q: "What types of tests are included in psychometric assessment?",
          a: "Our assessment battery includes career aptitude, personality, interest inventory, and work style assessments."
        },
        {
          q: "How long does the assessment take?",
          a: "The complete assessment takes approximately 90 minutes, followed by a consultation session."
        },
        {
          q: "Are the tests scientifically validated?",
          a: "Yes, all our assessments are internationally recognized and scientifically validated tools."
        },
        {
          q: "What do I get after the assessment?",
          a: "You receive a comprehensive report, personalized career recommendations, and a one-on-one consultation session."
        }
      ]
    },
    {
      category: "Payments & Insurance",
      questions: [
        {
          q: "What are your payment options?",
          a: "We accept various payment methods including credit/debit cards, UPI, net banking, and popular digital wallets. All payments are processed securely through our platform."
        },
        {
          q: "Do you accept insurance?",
          a: "Yes, we work with major insurance providers including Star Health, HDFC ERGO, Bajaj Allianz, ICICI Lombard, Max Bupa, and Aditya Birla Health to make counselling accessible and affordable."
        },
        {
          q: "What is your cancellation policy?",
          a: "You can reschedule or cancel your session up to 24 hours before the scheduled time without any charge. Cancellations within 24 hours may incur a fee. Emergency situations are handled on a case-by-case basis."
        },
        {
          q: "Do you offer refunds?",
          a: "Yes, we offer refunds in certain circumstances. If you're unsatisfied with your session, please contact our support team within 48 hours, and we'll review your case promptly."
        }
      ]
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
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Find answers to common questions about our career counselling services
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {faqs.map((category, categoryIndex) => (
                <div key={category.category} className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">{category.category}</h2>
                  <div className="space-y-4">
                    {category.questions.map((faq, questionIndex) => {
                      const index = `${categoryIndex}-${questionIndex}`;
                      const isOpen = openIndex === index;

                      return (
                        <div
                          key={index}
                          className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <button
                            className="w-full text-left px-6 py-4 flex items-center justify-between"
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                          >
                            <span className="font-semibold text-gray-900">{faq.q}</span>
                            <motion.span
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="text-blue-600"
                            >
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </motion.span>
                          </button>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 pb-4 text-gray-600">
                                  {faq.a}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Still Have Questions?
              </h2>
              <p className="text-gray-600 mb-8">
                Can't find the answer you're looking for? Our team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
                >
                  Contact Support
                </a>
                <a
                  href="tel:1800123456"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
                >
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
} 