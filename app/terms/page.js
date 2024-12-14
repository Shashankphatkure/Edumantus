"use client";

import PageTransition from '../components/PageTransition';

export default function Terms() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing and using Edumantus's website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services.`
    },
    {
      title: "2. Services Description",
      content: `Edumantus provides online mental health consultation services connecting users with licensed mental health professionals. Our services include but are not limited to:
• Video consultations
• Chat-based therapy
• Resource materials
• Self-help tools
• Emergency support referrals`
    },
    {
      title: "3. User Eligibility",
      content: `To use our services, you must:
• Be at least 18 years old
• Have the legal capacity to enter into contracts
• Provide accurate and complete registration information
• Maintain the security of your account credentials
Users under 18 may only use our services with parental/guardian consent and supervision.`
    },
    {
      title: "4. User Responsibilities",
      content: `As a user of our services, you agree to:
• Provide accurate and truthful information
• Maintain confidentiality of your account
• Not share or transfer your account access
• Notify us of any unauthorized account use
• Not use our services for illegal purposes
• Respect the privacy and rights of others`
    },
    {
      title: "5. Payment Terms",
      content: `5.1 Fees and Payments
• All fees are in Indian Rupees (INR)
• Payment is required before service delivery
• We accept major credit cards and digital payments
• Prices may change with prior notice

5.2 Cancellation and Refunds
• 24-hour cancellation policy applies
• Refunds are processed within 5-7 business days
• No refunds for completed sessions`
    },
    {
      title: "6. Professional Services",
      content: `6.1 Healthcare Providers
• All providers are licensed professionals
• Providers maintain independent professional judgment
• We do not guarantee specific outcomes

6.2 Emergency Services
• Our services are not for emergencies
• Call emergency services for immediate help
• We provide crisis resources and referrals`
    },
    {
      title: "7. Privacy and Confidentiality",
      content: `We protect your privacy according to our Privacy Policy. However:
• We may disclose information if legally required
• Providers may break confidentiality if safety is at risk
• We maintain secure data storage systems`
    },
    {
      title: "8. Intellectual Property",
      content: `All content on our platform is protected by copyright and other intellectual property rights. Users may not:
• Copy or reproduce our content
• Modify or create derivative works
• Distribute or publicly display content
• Use content for commercial purposes`
    },
    {
      title: "9. Limitation of Liability",
      content: `To the maximum extent permitted by law:
• We are not liable for indirect damages
• Our liability is limited to fees paid
• We do not guarantee specific outcomes
• Users assume risks of online services`
    },
    {
      title: "10. Modifications to Terms",
      content: `We may modify these Terms at any time. Changes will be effective upon posting. Continued use of our services constitutes acceptance of modified Terms.`
    },
    {
      title: "11. Termination",
      content: `We may terminate or suspend access to our services:
• For Terms violations
• For harmful or illegal activity
• At our discretion with notice
Users may terminate their account at any time.`
    },
    {
      title: "12. Contact Information",
      content: `For questions about these Terms:
• Email: legal@Edumantus.in
• Phone: 1800-123-4567
• Address: Mindful Tower, Bandra West, Mumbai - 400050`
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
                Terms of Service
              </h1>
              <p className="text-xl text-blue-100 mb-4">
                Please read these terms carefully before using our services
              </p>
              <p className="text-blue-100">
                Last Updated: {new Date().toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                {sections.map((section, index) => (
                  <div key={index} className="mb-12 last:mb-0">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">
                      {section.title}
                    </h2>
                    <div className="prose prose-lg text-gray-600 whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Questions About Our Terms?
              </h2>
              <p className="text-gray-600 mb-8">
                Our legal team is here to help you understand our terms of service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:legal@Edumantus.in"
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
                >
                  Contact Legal Team
                </a>
                <a
                  href="/contact"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
} 