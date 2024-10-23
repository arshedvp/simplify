'use client';
import React, { useState } from 'react';
import { Phone, MessageCircle, Home, User, Settings, ChevronRight, CreditCard, Signal, Battery, Wifi } from 'lucide-react';
import CallLogs from '../callLogs/page';
import Recharge from '../recharge/page';
import Chat from '../chat/page';

const DashboardCard = ({ title, value, unit, icon: Icon }) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
    <div className="flex items-center gap-3 mb-2">
      {Icon && (
        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
          <Icon className="w-4 h-4 text-indigo-600" />
        </div>
      )}
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    </div>
    <div className="flex items-baseline">
      <span className="text-3xl font-bold text-gray-800 mr-2">{value}</span>
      <span className="text-sm text-gray-500">{unit}</span>
    </div>
  </div>
);

const RecentActivity = ({ date, amount }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 group">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
        <CreditCard className="w-4 h-4 text-indigo-600" />
      </div>
      <span className="text-sm font-medium text-gray-700">{date}</span>
    </div>
    <div className="flex items-center">
      <span className="text-sm font-semibold text-gray-800">${amount}</span>
      <ChevronRight className="w-4 h-4 text-gray-400 ml-2 group-hover:text-indigo-600 transition-colors" />
    </div>
  </div>
);

const PremiumCard = ({ amount }) => (
  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 mb-6 shadow-lg">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <CreditCard className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Premium</h3>
          <div className="flex gap-2 mt-1">
            <Signal className="w-4 h-4 text-white/80" />
            <Wifi className="w-4 h-4 text-white/80" />
            <Battery className="w-4 h-4 text-white/80" />
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-between items-center mt-6">
      <div>
        <span className="text-3xl font-bold text-white">${amount}</span>
        <span className="text-sm text-white/75 ml-2">/ month</span>
      </div>
      <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-colors">
        Renew
      </button>
    </div>
  </div>
);

const BottomBar = ({ activePage, setActivePage }) => (
  <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex justify-around bg-white/80 backdrop-blur-md rounded-2xl py-4 px-8 shadow-lg border border-gray-100 w-[calc(100%-3rem)] max-w-md">
    {[
      { icon: Home, id: 'home' },
      { icon: Phone, id: 'callLogs' },
      { icon: MessageCircle, id: 'chat' },
      { icon: User, id: 'profile' },
      { icon: Settings, id: 'settings' }
    ].map(({ icon: Icon, id }) => (
      <button
        key={id}
        onClick={() => setActivePage(id)}
        className={`p-2 transition-colors ${
          activePage === id 
            ? 'text-indigo-600 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 after:rounded-full' 
            : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        <Icon className="w-6 h-6" />
      </button>
    ))}
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
          icon={Signal}
        />
        <DashboardCard 
          title="Minutes" 
          value={userData.minutes} 
          unit="min" 
          icon={Phone}
        />
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Recent Bills</h3>
          <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors">
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
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6 pb-24">
      <div className="max-w-md mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
            <p className="text-sm text-gray-600">{userData.phoneNumber}</p>
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full overflow-hidden flex items-center justify-center text-white text-lg font-semibold">
              {userData.name[0]}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
          </div>
        </header>

        {renderPage()}

        <BottomBar activePage={activePage} setActivePage={setActivePage} />
      </div>
    </div>
  );
}