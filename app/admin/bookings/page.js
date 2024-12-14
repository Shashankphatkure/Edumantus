"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageTransition from '../../components/PageTransition';

export default function AdminBookings() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Mock booking data - in a real app, this would come from your backend
  const bookings = [
    {
      id: 'BK001',
      patientName: 'Rahul Kumar',
      expertName: 'Dr. Sharma',
      expertImage: 'https://picsum.photos/seed/expert1/200/200',
      date: '2024-03-20',
      time: '10:00 AM',
      type: 'Video Consultation',
      status: 'upcoming',
      amount: '₹1,500',
      patientEmail: 'rahul@example.com',
      patientPhone: '+91 98765 43210',
      notes: 'First time consultation for anxiety management'
    },
    {
      id: 'BK002',
      patientName: 'Priya Singh',
      expertName: 'Dr. Patel',
      expertImage: 'https://picsum.photos/seed/expert2/200/200',
      date: '2024-03-19',
      time: '2:30 PM',
      type: 'Video Consultation',
      status: 'completed',
      amount: '₹2,000',
      patientEmail: 'priya@example.com',
      patientPhone: '+91 98765 43211',
      notes: 'Follow-up session'
    },
    {
      id: 'BK003',
      patientName: 'Amit Shah',
      expertName: 'Dr. Gupta',
      expertImage: 'https://picsum.photos/seed/expert3/200/200',
      date: '2024-03-21',
      time: '11:00 AM',
      type: 'Video Consultation',
      status: 'cancelled',
      amount: '₹1,800',
      patientEmail: 'amit@example.com',
      patientPhone: '+91 98765 43212',
      notes: 'Rescheduled from last week'
    }
  ];

  const statusColors = {
    upcoming: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    rescheduled: 'bg-yellow-100 text-yellow-800'
  };

  const filteredBookings = bookings
    .filter(booking => {
      const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
      const matchesSearch = 
        booking.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.expertName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc' 
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date);
      }
      if (sortBy === 'amount') {
        const amountA = parseInt(a.amount.replace(/[^0-9]/g, ''));
        const amountB = parseInt(b.amount.replace(/[^0-9]/g, ''));
        return sortOrder === 'desc' ? amountB - amountA : amountA - amountB;
      }
      return 0;
    });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manage Bookings</h1>
            <p className="mt-2 text-gray-600">View and manage all consultation bookings</p>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <input
                  type="text"
                  placeholder="Search by name or booking ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="rescheduled">Rescheduled</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="date">Sort by Date</option>
                  <option value="amount">Sort by Amount</option>
                </select>
              </div>

              {/* Sort Order */}
              <div>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
                    <div className="flex items-center mb-4 sm:mb-0">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={booking.expertImage}
                          alt={booking.expertName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {booking.patientName}
                        </h3>
                        <p className="text-gray-600">
                          Booking ID: {booking.id}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[booking.status]}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      <span className="font-semibold text-gray-900">
                        {booking.amount}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Expert</p>
                      <p className="font-medium">{booking.expertName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date & Time</p>
                      <p className="font-medium">
                        {new Date(booking.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })} at {booking.time}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Contact</p>
                      <p className="font-medium">{booking.patientEmail}</p>
                      <p className="font-medium">{booking.patientPhone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Type</p>
                      <p className="font-medium">{booking.type}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 mb-4">Notes: {booking.notes}</p>
                    <div className="flex flex-wrap gap-2">
                      {booking.status === 'upcoming' && (
                        <>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                            Start Session
                          </button>
                          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-300">
                            Reschedule
                          </button>
                          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300">
                            Cancel
                          </button>
                        </>
                      )}
                      {booking.status === 'completed' && (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                          View Summary
                        </button>
                      )}
                      <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No bookings found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
} 