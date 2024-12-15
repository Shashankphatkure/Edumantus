"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Search({ isOpen, onClose }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock search data - in a real app, this would come from your backend
  const searchData = [
    {
      title: "Clinical Issues",
      type: "Service",
      url: "/services/clinical-issues",
      description: "Expert support for anxiety, depression, OCD, and other mental health conditions."
    },
    {
      title: "Relationship Issues",
      type: "Service",
      url: "/services/relationship-issues",
      description: "Professional guidance for all types of relationships and interpersonal dynamics."
    },
    {
      title: "Children and Adolescent Issues",
      type: "Service",
      url: "/services/children-and-adolescent-issues",
      description: "Specialized care for young individuals facing developmental and emotional challenges."
    },
    {
      title: "Women Centric Issues",
      type: "Service",
      url: "/services/women-centric-issues",
      description: "Dedicated support for women's mental health and life challenges."
    },
    {
      title: "Life Style Issues",
      type: "Service",
      url: "/services/life-style-issues",
      description: "Guidance for maintaining balance and well-being in your daily life."
    },
    {
      title: "Self-Improvement",
      type: "Service",
      url: "/services/self-improvement",
      description: "Programs to enhance personal growth, confidence, and self-awareness."
    },
    {
      title: "Workplace Issues",
      type: "Service",
      url: "/services/workplace-issues",
      description: "Support for career development and workplace challenges."
    },
    {
      title: "Higher Education and Coaching",
      type: "Service",
      url: "/services/higher-education-and-coaching",
      description: "Specialized guidance for academic excellence and career advancement."
    },
    {
      title: "Dr. Sharma",
      type: "Expert",
      url: "/our-experts#dr-sharma",
      description: "Clinical Psychologist • 15+ years experience • Anxiety, Depression, PTSD"
    },
    {
      title: "Dr. Patel",
      type: "Expert",
      url: "/our-experts#dr-patel",
      description: "Psychiatrist • 15+ years experience • Bipolar Disorder, Schizophrenia, OCD"
    },
    {
      title: "Dr. Gupta",
      type: "Expert",
      url: "/our-experts#dr-gupta",
      description: "Relationship Counselor • 15+ years experience • Couples Therapy, Family Counseling"
    },
    {
      title: "Book Consultation",
      type: "Action",
      url: "/book-consultation",
      description: "Schedule your online consultation with our mental health experts."
    },
    {
      title: "About Us",
      type: "Page",
      url: "/about",
      description: "Learn about our mission and commitment to mental health care."
    },
    {
      title: "Contact Us",
      type: "Page",
      url: "/contact",
      description: "Get in touch with our support team for any queries."
    },
    {
      title: "Resources",
      type: "Page",
      url: "/resources",
      description: "Free mental health resources, articles, and self-assessment tools."
    },
    {
      title: "Insurance Coverage",
      type: "Page",
      url: "/insurance",
      description: "Information about insurance providers and coverage details."
    }
  ];

  const performSearch = useCallback(() => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const results = searchData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setLoading(false);
    }, 300);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      performSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, performSearch]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleResultClick = (url) => {
    router.push(url);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl mx-auto mt-20 bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Search Input */}
          <div className="p-4 border-b relative">
            <input
              type="text"
              placeholder="Search for services, experts, or pages..."
              className="w-full px-4 py-3 pl-12 rounded-xl bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <svg
              className="w-6 h-6 text-gray-400 absolute left-8 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Search Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center text-gray-500">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                Searching...
              </div>
            ) : searchQuery.length >= 2 ? (
              searchResults.length > 0 ? (
                <div className="p-2">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleResultClick(result.url)}
                      className="w-full p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200 text-left group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                            {result.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {result.description}
                          </p>
                        </div>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                          {result.type}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No results found for "{searchQuery}"
                </div>
              )
            ) : searchQuery.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Start typing to search...
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                Enter at least 2 characters to search
              </div>
            )}
          </div>

          {/* Quick Links */}
          {searchQuery.length === 0 && (
            <div className="p-4 bg-gray-50 border-t">
              <div className="text-sm font-medium text-gray-600 mb-3">
                Quick Links
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'Book Consultation',
                  'Our Experts',
                  'Services',
                  'Resources',
                  'Contact'
                ].map((link) => (
                  <button
                    key={link}
                    onClick={() => handleResultClick('/' + link.toLowerCase().replace(' ', '-'))}
                    className="px-4 py-2 rounded-full bg-white border hover:bg-gray-50 transition-colors duration-200 text-sm"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 