'use client';
import React, { useState } from 'react';
import { Phone, MessageCircle, Home, User, Settings, ChevronRight, CreditCard } from 'lucide-react';
import CallLogs from '../callLogs/page';
import Recharge from '../recharge/page';
import Chat from '../chat/page';

// Subcomponents
const DashboardCard = ({ title, value, unit, icon: Icon }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm">
    <div className="flex items-center gap-2 mb-1">
      {Icon && <Icon className="w-4 h-4 text-gray-500" />}
      <h3 className="text-sm text-gray-500">{title}</h3>
    </div>
    <div className="flex items-baseline">
      <span className="text-2xl font-bold text-gray-700 mr-1">{value}</span>
      <span className="text-sm text-gray-700">{unit}</span>
    </div>
  </div>
);

const RecentActivity = ({ date, amount }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
    <span className="text-sm text-gray-700">{date}</span>
    <div className="flex items-center">
      <span className="text-sm font-semibold">${amount}</span>
      <ChevronRight className="w-4 h-4 text-gray-400 ml-2" />
    </div>
  </div>
);

const PremiumCard = ({ amount }) => (
  <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold text-gray-700">Premium</h3>
      <CreditCard className="w-5 h-5 text-gray-500" />
    </div>
    <div className="flex justify-between items-center">
      <div>
        <span className="text-2xl font-bold text-gray-700">${amount}</span>
        <span className="text-sm text-gray-500 ml-2">/ month</span>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition-colors">
        Renew
      </button>
    </div>
  </div>
);

const BottomBar = ({ activePage, setActivePage }) => (
  <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex justify-around bg-white rounded-full py-2 px-6 shadow-lg w-[calc(100%-3rem)] max-w-md">
    <button
      onClick={() => setActivePage('home')}
      className={`p-2 ${activePage === 'home' ? 'text-blue-500' : 'text-gray-800'}`}
    >
      <Home className="w-6 h-6" />
    </button>
    <button
      onClick={() => setActivePage('callLogs')}
      className={`p-2 ${activePage === 'callLogs' ? 'text-blue-500' : 'text-gray-800'}`}
    >
      <Phone className="w-6 h-6" />
    </button>
    <button
      onClick={() => setActivePage('chat')}
      className={`p-2 ${activePage === 'chat' ? 'text-blue-500' : 'text-gray-800'}`}
    >
      <MessageCircle className="w-6 h-6" />
    </button>
    <button
      onClick={() => setActivePage('profile')}
      className={`p-2 ${activePage === 'profile' ? 'text-blue-500' : 'text-gray-800'}`}
    >
      <User className="w-6 h-6" />
    </button>
    <button
      onClick={() => setActivePage('settings')}
      className={`p-2 ${activePage === 'settings' ? 'text-blue-500' : 'text-gray-800'}`}
    >
      <Settings className="w-6 h-6" />
    </button>
  </nav>
);

export default function Dashboard({ userData }) {
  const [activePage, setActivePage] = useState('home');

  const renderHomePage = () => (
    <>
      <PremiumCard amount={userData.premiumAmount} />

      <div className="grid grid-cols-2 gap-4 mb-6">
        <DashboardCard 
          title="Call & Data Usage" 
          value={userData.callDataUsage} 
          unit="GB left" 
          icon={Phone}
        />
        <DashboardCard 
          title="Minutes" 
          value={userData.minutes} 
          unit="min" 
          icon={MessageCircle}
        />
      </div>

      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Recent Bills</h3>
          <button className="text-blue-500 text-sm font-semibold">
            View All
          </button>
        </div>
        {userData.recentBills.map((bill, index) => (
          <RecentActivity key={index} date={bill.date} amount={bill.amount} />
        ))}
      </div>
    </>
  );

  const renderPage = () => {
    switch (activePage) {
      case 'callLogs':
        return <CallLogs />;
      case 'recharge':
        return <Recharge />;
      case 'chat':
        return <Chat />;
      default:
        return renderHomePage();
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-200 to-blue-200 min-h-screen p-6 pb-24">
      <div className="max-w-md mx-auto">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-700">{userData.name}</h2>
            <p className="text-sm text-gray-700">{userData.phoneNumber}</p>
          </div>
          <div className="relative">
            <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
              {/* Add an image here if available */}
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
        </header>

        {renderPage()}

        <BottomBar activePage={activePage} setActivePage={setActivePage} />
      </div>
    </div>
  );
}