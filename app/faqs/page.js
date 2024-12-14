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
          q: "What is online mental health consultation?",
          a: "Online mental health consultation is a secure, confidential way to connect with licensed mental health professionals through video calls, voice calls, or chat. It provides the same quality of care as in-person sessions but with added convenience and accessibility."
        },
        {
          q: "Is online therapy as effective as in-person therapy?",
          a: "Yes, research shows that online therapy can be just as effective as in-person therapy for many mental health conditions. It offers the same level of professional care while providing additional benefits like convenience, accessibility, and comfort of receiving care from your own space."
        },
        {
          q: "How do I know if I need therapy?",
          a: "Consider seeking therapy if you're experiencing persistent feelings of sadness, anxiety, stress, or if you're dealing with relationship issues, work-related stress, or any other emotional challenges that affect your daily life. There's no wrong time to seek support for your mental well-being."
        }
      ]
    },
    {
      category: "Consultation Process",
      questions: [
        {
          q: "How do I book a consultation?",
          a: "Booking a consultation is simple: Choose your preferred therapist, select an available time slot, make the payment, and you'll receive a confirmation with session details. You can book through our website or mobile app."
        },
        {
          q: "What happens in the first session?",
          a: "The first session is typically an assessment where your therapist will get to know you, understand your concerns, discuss your goals, and develop a treatment plan. It's also an opportunity for you to ask questions and ensure you feel comfortable with the therapist."
        },
        {
          q: "How long are the sessions?",
          a: "Standard sessions are 50-60 minutes long. However, the duration may vary based on the type of therapy and your specific needs. Some specialized sessions or initial consultations might be longer."
        }
      ]
    },
    {
      category: "Privacy & Security",
      questions: [
        {
          q: "Is my information confidential?",
          a: "Yes, we maintain strict confidentiality of all client information. Our platform uses end-to-end encryption for video sessions, and all data is stored securely following international privacy standards and HIPAA guidelines."
        },
        {
          q: "Who has access to my therapy records?",
          a: "Only your assigned therapist has access to your therapy records. Our system maintains strict access controls, and information is only shared with your explicit consent or if required by law (in cases of immediate danger to self or others)."
        }
      ]
    },
    {
      category: "Payments & Cancellation",
      questions: [
        {
          q: "What are your payment options?",
          a: "We accept various payment methods including credit/debit cards, UPI, net banking, and popular digital wallets. All payments are processed securely through our platform."
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
                Find answers to common questions about our mental health consultation services.
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
                  <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
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