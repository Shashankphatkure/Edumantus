"use client";

import { useState } from 'react';
import PageTransition from '../components/PageTransition';
import Overview from './components/Overview';
import Experts from './components/Experts';
import Users from './components/Users';
import Bookings from './components/Bookings';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    totalBookings: 156,
    totalExperts: 24,
    totalUsers: 892,
    totalRevenue: "₹2,45,000",
    activeUsers: 45,
    pendingApprovals: 12
  };

  const recentActivities = [
    { id: 1, type: 'New Expert Registration', name: 'Dr. Sharma', time: '2 hours ago' },
    { id: 2, type: 'New Booking', name: 'Rahul Kumar', time: '3 hours ago' },
    { id: 3, type: 'Expert Approval', name: 'Dr. Patel', time: '5 hours ago' },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return <Overview stats={stats} recentActivities={recentActivities} />;
      case 'experts':
        return <Experts />;
      case 'users':
        return <Users />;
      case 'bookings':
        return <Bookings />;
      default:
        return <Overview stats={stats} recentActivities={recentActivities} />;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        {/* Admin Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <div className="hidden md:flex space-x-4">
                  <button 
                    onClick={() => setActiveTab('overview')}
                    className={`px-3 py-2 rounded-md ${activeTab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                  >
                    Overview
                  </button>
                  <button 
                    onClick={() => setActiveTab('experts')}
                    className={`px-3 py-2 rounded-md ${activeTab === 'experts' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                  >
                    Experts
                  </button>
                  <button 
                    onClick={() => setActiveTab('users')}
                    className={`px-3 py-2 rounded-md ${activeTab === 'users' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                  >
                    Users
                  </button>
                  <button 
                    onClick={() => setActiveTab('bookings')}
                    className={`px-3 py-2 rounded-md ${activeTab === 'bookings' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                  >
                    Bookings
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  New Expert
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {renderContent()}
        </main>
      </div>
    </PageTransition>
  );
} 