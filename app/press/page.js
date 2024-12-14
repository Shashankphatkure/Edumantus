"use client";

import Image from 'next/image';
import Link from 'next/link';
import PageTransition from '../components/PageTransition';

export default function Press() {
  const pressReleases = [
    {
      date: "March 15, 2024",
      title: "MindfulCare Launches Revolutionary Online Mental Health Platform",
      description: "Platform brings professional mental health care to millions of Indians through innovative technology.",
      link: "#"
    },
    {
      date: "February 28, 2024",
      title: "MindfulCare Raises $10M Series A Funding",
      description: "Investment to expand mental health services across India and enhance technology platform.",
      link: "#"
    },
    {
      date: "January 10, 2024",
      title: "MindfulCare Partners with Leading Insurance Providers",
      description: "Partnership makes mental health care more accessible and affordable for millions.",
      link: "#"
    }
  ];

  const newsCoverage = [
    {
      source: "The Economic Times",
      date: "March 16, 2024",
      title: "MindfulCare: Revolutionizing Mental Health Care in India",
      image: "https://picsum.photos/seed/news1/800/600",
      link: "#"
    },
    {
      source: "YourStory",
      date: "March 1, 2024",
      title: "How MindfulCare is Making Mental Health Care Accessible",
      image: "https://picsum.photos/seed/news2/800/600",
      link: "#"
    },
    {
      source: "Inc42",
      date: "February 29, 2024",
      title: "MindfulCare's Series A Funding to Boost Mental Health Tech",
      image: "https://picsum.photos/seed/news3/800/600",
      link: "#"
    }
  ];

  const mediaResources = [
    {
      title: "Brand Assets",
      description: "Download our logo, brand guidelines, and other visual assets.",
      icon: "🎨",
      link: "#"
    },
    {
      title: "Press Kit",
      description: "Access our press kit with company information and high-res images.",
      icon: "📁",
      link: "#"
    },
    {
      title: "Media Inquiries",
      description: "Contact our media relations team for interviews and information.",
      icon: "📱",
      link: "#"
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
                Press & Media Center
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Latest news, press releases, and media resources from MindfulCare
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:press@mindfulcare.in"
                  className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
                >
                  Media Inquiries
                </a>
                <a
                  href="#resources"
                  className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  Download Press Kit
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Press Releases */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Latest Press Releases</h2>
              <div className="space-y-8">
                {pressReleases.map((release, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="text-sm text-gray-500 mb-2">{release.date}</div>
                    <h3 className="text-xl font-bold mb-3">{release.title}</h3>
                    <p className="text-gray-600 mb-4">{release.description}</p>
                    <a
                      href={release.link}
                      className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300"
                    >
                      Read More →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* News Coverage */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">In The News</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {newsCoverage.map((news, index) => (
                  <a
                    key={index}
                    href={news.link}
                    className="group bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-48">
                      <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-blue-600 font-medium">{news.source}</span>
                        <span className="text-sm text-gray-500">{news.date}</span>
                      </div>
                      <h3 className="font-bold group-hover:text-blue-600 transition-colors duration-300">
                        {news.title}
                      </h3>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Media Resources */}
        <section id="resources" className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Media Resources</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {mediaResources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.link}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
                  >
                    <div className="text-4xl mb-4">{resource.icon}</div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600">{resource.description}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Media Contact
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                For press inquiries, interview requests, and media information
              </p>
              <div className="space-y-4">
                <p className="text-blue-100">
                  <strong>Media Relations:</strong> press@mindfulcare.in
                </p>
                <p className="text-blue-100">
                  <strong>Phone:</strong> +91 22 1234 5678
                </p>
                <p className="text-blue-100">
                  <strong>Working Hours:</strong> Monday to Friday, 9:00 AM - 6:00 PM IST
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
} 