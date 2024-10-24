'use client'
import React, { useState } from 'react';
import { Phone, Clapperboard, WalletCards, ChevronRight, Home, User, Settings, Activity } from 'lucide-react';
import { CallPage } from './CallPage';
import Link from 'next/link';

const DashboardCard = ({ title, value, unit, icon: Icon }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
    <div className="flex items-center gap-3 mb-3">
      {Icon && <Icon className="w-5 h-5 text-blue-500" />}
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    </div>
    <div className="flex items-baseline">
      <span className="text-3xl font-bold text-gray-800 mr-2">{value}</span>
      <span className="text-sm font-medium text-gray-500">{unit}</span>
    </div>
  </div>
);

const RecentActivity = ({ date, amount }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
        <Activity className="w-4 h-4 text-blue-500" />
      </div>
      <span className="text-sm font-medium text-gray-700">{date}</span>
    </div>
    <span className="text-sm font-semibold text-gray-900">${amount}</span>
  </div>
);

export function Dashboard({ userData }) {
  const [showCallPage, setShowCallPage] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <header className="flex justify-between items-center py-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
            <p className="text-sm font-medium text-gray-500">{userData.phoneNumber}</p>
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

        {/* Premium Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 mb-6 shadow-lg text-white">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold opacity-90">Premium Plan</h3>
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
              Active
            </span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <span className="text-3xl font-bold">${userData.premiumAmount}</span>
              <p className="text-sm opacity-75 mt-1">Next billing in 7 days</p>
            </div>
            <Link href='/renew' className="px-6 py-2 bg-white text-blue-600 rounded-xl font-semibold text-sm hover:shadow-lg transition-all">
              Renew
            </Link>
          </div>
        </div>

        {/* Usage Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <DashboardCard 
            title="Data Usage" 
            value={userData.callDataUsage} 
            unit="GB left" 
            icon={Activity}
          />
          <DashboardCard 
            title="Minutes" 
            value={userData.minutes} 
            unit="min" 
            icon={Phone}
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
          {showCallPage ? (
            <>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Call History</h3>
              <CallPage />
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Recent Bills</h3>
                <button className="text-blue-500 flex items-center gap-1 text-sm font-medium">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              {userData.recentBills.map((bill, index) => (
                <RecentActivity key={index} date={bill.date} amount={bill.amount} />
              ))}
            </>
          )}
        </div>

        {/* Navigation Bar */}
        <nav className="fixed bottom-4 left-4 right-4 max-w-md mx-auto bg-white rounded-2xl py-4 px-6 shadow-xl">
          <div className="flex justify-between items-center">
            {[
              { icon: Home, label: 'Home', path: '/dashboard' },
              { icon: Phone, label: 'Call', path: '/call' },
              { icon: Clapperboard, label: 'Shows', path: '/shows' },
              { icon: WalletCards, label: 'Wallet', path: '/wallet' },
              { icon: User, label: 'Profile', path: '/profile' },
            ].map(({ icon: Icon, label, path }) => (
              <a
                key={label}
                href={path}
                className={`flex flex-col items-center gap-1 ${
                  activeTab === label.toLowerCase() 
                    ? 'text-blue-500' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                onClick={() => {
                  setActiveTab(label.toLowerCase());
                  if (label === 'Call') setShowCallPage(false);
                }}
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