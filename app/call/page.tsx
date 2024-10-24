"use client"
import React, { useState } from 'react';
import { Phone, Clapperboard, WalletCards, ChevronRight, Home, User, Settings, Search, ArrowUpRight, ArrowDownLeft, X } from 'lucide-react';

const CallEntry = ({ name, number, time, type }) => {
  const getCallTypeStyles = (type) => {
    switch (type) {
      case 'incoming':
        return {
          bg: 'bg-green-100',
          text: 'text-green-600',
          icon: <ArrowDownLeft className="w-5 h-5" />
        };
      case 'outgoing':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-600',
          icon: <ArrowUpRight className="w-5 h-5" />
        };
      case 'missed':
        return {
          bg: 'bg-pink-100',
          text: 'text-pink-600',
          icon: <X className="w-5 h-5" />
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600',
          icon: <Phone className="w-5 h-5" />
        };
    }
  };

  const styles = getCallTypeStyles(type);

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors px-4">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${styles.bg} ${styles.text}`}>
          {styles.icon}
        </div>
        <div>
          <h3 className="text-gray-800 font-semibold">{name}</h3>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            {number}
          </p>
        </div>
      </div>
      <div className="text-right flex flex-col items-end">
        <p className="text-sm text-gray-500 mb-1">{time}</p>
        <button className="text-blue-500 hover:text-blue-600 transition-colors">
          <Phone className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default function CallPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const calls = [
    { name: 'John Marius', number: '0123456789', time: '10:30 AM', type: 'incoming' },
    { name: 'Sarah Wilson', number: '9876543210', time: 'Yesterday', type: 'missed' },
    { name: 'David Lee', number: '4567890123', time: 'Yesterday', type: 'outgoing' },
    { name: 'Emma Thompson', number: '3334445555', time: '2 days ago', type: 'incoming' },
  ];

  const filteredCalls = calls.filter(call =>
    (activeTab === 'all' || call.type === activeTab) &&
    (call.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    call.number.includes(searchQuery))
  );

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <header className="flex justify-between items-center py-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Call History</h2>
            <p className="text-sm font-medium text-gray-500">Recent activities</p>
          </div>
          <div className="relative">
            <img 
              src="./images.png"
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-white shadow-md"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-lg">
          <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-2">
            <Search className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search calls..."
              className="bg-transparent border-none outline-none flex-1 text-sm text-gray-700 placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Call Stats */}
        <div className="mb-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                <ArrowDownLeft className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-sm font-medium text-gray-500">Incoming</div>
              <div className="text-2xl font-bold text-green-600">12</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <ArrowUpRight className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-sm font-medium text-gray-500">Outgoing</div>
              <div className="text-2xl font-bold text-blue-600">8</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mb-2">
                <X className="w-5 h-5 text-pink-600" />
              </div>
              <div className="text-sm font-medium text-gray-500">Missed</div>
              <div className="text-2xl font-bold text-pink-600">3</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto px-1">
          {['all', 'incoming', 'outgoing', 'missed'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Call List */}
        <div className="bg-white rounded-2xl shadow-lg mb-20">
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Recent Calls</h3>
            <button className="text-blue-500 flex items-center gap-1 text-sm font-medium">
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          {filteredCalls.length > 0 ? (
            filteredCalls.map((call, index) => (
              <CallEntry key={index} {...call} />
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No calls found</p>
              <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Navigation Bar */}
        <nav className="fixed bottom-4 left-4 right-4 max-w-md mx-auto bg-white rounded-2xl py-4 px-6 shadow-xl">
          <div className="flex justify-between items-center">
            {[
              { icon: Home, label: 'Home', path: '/dashboard' },
              { icon: Phone, label: 'Call', path: '/call', active: true },
              { icon: Clapperboard, label: 'Shows', path: '/shows' },
              { icon: WalletCards, label: 'Wallet', path: '/wallet' },
              { icon: User, label: 'Profile', path: '/profile' },
            ].map(({ icon: Icon, label, path, active }) => (
              <a
                key={label}
                href={path}
                className={`flex flex-col items-center gap-1 ${
                  active ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{label}</span>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}