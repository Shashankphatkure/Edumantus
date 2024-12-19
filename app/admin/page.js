"use client";

import { useState } from 'react';
import PageTransition from '../components/PageTransition';
import Experts from './components/Experts';
import Users from './components/Users';
import Bookings from './components/Bookings';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('bookings');

  const renderContent = () => {
    switch(activeTab) {
      case 'experts':
        return <Experts />;
      case 'users':
        return <Users />;
      case 'bookings':
        return <Bookings />;
      default:
        return <Bookings />;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <div className="hidden md:flex space-x-4">
                  <button 
                    onClick={() => setActiveTab('bookings')}
                    className={`px-3 py-2 rounded-md ${activeTab === 'bookings' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                  >
                    Bookings
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
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">
          {renderContent()}
        </main>
      </div>
    </PageTransition>
  );
} 