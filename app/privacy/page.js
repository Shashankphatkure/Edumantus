import PageTransition from '../components/PageTransition';

export default function Privacy() {
  const sections = [
    {
      title: "Introduction",
      content: `At Edmantus, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and mental health consultation services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.`
    },
    {
      title: "Information We Collect",
      subsections: [
        {
          title: "Personal Information",
          content: `We may collect personal information that you voluntarily provide to us when you:
• Register on our platform
• Express interest in obtaining information about us or our services
• Participate in activities on our platform
• Contact us for support
This information may include:
• Name and contact details
• Date of birth
• Medical history
• Payment information`
        },
        {
          title: "Automatically Collected Information",
          content: `When you visit our platform, we may automatically collect certain information about your device, including:
• IP address
• Browser type
• Operating system
• Access times
• Pages viewed
This information helps us analyze trends, administer the site, and track users' movements around the site.`
        }
      ]
    },
    {
      title: "How We Use Your Information",
      content: `We use the information we collect to:
• Provide, operate, and maintain our services
• Improve and personalize your experience
• Understand and analyze how you use our services
• Develop new products, services, features, and functionality
• Communicate with you about appointments, services, and updates
• Process your transactions
• Prevent fraudulent transactions and monitor against theft
• Send you marketing and promotional communications (with your consent)`
    },
    {
      title: "Information Security",
      content: `We implement appropriate technical and organizational security measures to protect your information, including:
• End-to-end encryption for video sessions
• Secure storage of personal data
• Regular security assessments
• Access controls and authentication
• Staff training on data protection
However, please note that no method of transmission over the internet or electronic storage is 100% secure.`
    },
    {
      title: "Sharing Your Information",
      content: `We may share your information with:
• Your assigned healthcare providers
• Third-party service providers (with your consent)
• Legal authorities when required by law
We do not sell, rent, or trade your personal information to third parties for marketing purposes.`
    },
    {
      title: "Your Rights",
      content: `You have the right to:
• Access your personal information
• Correct inaccurate or incomplete information
• Request deletion of your information
• Withdraw consent for data processing
• Request a copy of your data
• Lodge a complaint with supervisory authorities
To exercise these rights, please contact our Data Protection Officer.`
    },
    {
      title: "Data Retention",
      content: `We retain your personal information for as long as necessary to:
• Provide our services
• Comply with legal obligations
• Resolve disputes
• Enforce our agreements
When your data is no longer required, it will be securely deleted or anonymized.`
    },
    {
      title: "Children's Privacy",
      content: `Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are under 13, please do not provide any information on this website.`
    },
    {
      title: "Changes to This Policy",
      content: `We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date.`
    },
    {
      title: "Contact Us",
      content: `If you have any questions about this Privacy Policy, please contact us at:
• Email: Info@edmantus.com
• Phone: +91-9267910906
• Address: Mantu Crafts (OPC) Pvt. Ltd., B1/A5, First Floor, Mohan Cooperative Industrial Area, New Delhi - 110044`
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
                Privacy Policy
              </h1>
              <p className="text-xl text-blue-100 mb-4">
                Your privacy is important to us
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
                    {section.subsections ? (
                      <div className="space-y-8">
                        {section.subsections.map((subsection, subIndex) => (
                          <div key={subIndex}>
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                              {subsection.title}
                            </h3>
                            <div className="prose prose-lg text-gray-600 whitespace-pre-line">
                              {subsection.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="prose prose-lg text-gray-600 whitespace-pre-line">
                        {section.content}
                      </div>
                    )}
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
                Have Questions About Your Privacy?
              </h2>
              <p className="text-gray-600 mb-8">
                Our Data Protection team is here to help you understand how we protect your information.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:Info@edmantus.com"
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
                >
                  Email Privacy Team
                </a>
                <a
                  href="/contact"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
} 