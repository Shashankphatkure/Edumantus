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
      title: "Depression & Anxiety",
      type: "Service",
      url: "/services#depression-anxiety",
      description: "Expert treatment for depression and anxiety disorders."
    },
    {
      title: "Dr. Sharma",
      type: "Expert",
      url: "/our-experts#dr-sharma",
      description: "Senior Psychiatrist with 15+ years of experience."
    },
    {
      title: "Online Consultation",
      type: "Service",
      url: "/book-consultation",
      description: "Book online mental health consultations."
    },
    {
      title: "Relationship Counseling",
      type: "Service",
      url: "/services#relationship",
      description: "Professional counseling for couples and relationships."
    },
    {
      title: "Career Opportunities",
      type: "Page",
      url: "/careers",
      description: "Join our team of mental health professionals."
    },
    {
      title: "About Us",
      type: "Page",
      url: "/about",
      description: "Learn about our mission and values."
    },
    {
      title: "Privacy Policy",
      type: "Page",
      url: "/privacy",
      description: "Our commitment to your privacy."
    },
    {
      title: "Terms of Service",
      type: "Page",
      url: "/terms",
      description: "Terms and conditions for using our services."
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
                {['Book Consultation', 'Our Experts', 'Services', 'About Us'].map((link) => (
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