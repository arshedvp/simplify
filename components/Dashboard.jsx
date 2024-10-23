import React from 'react';
import { Phone, MessageCircle, Clock, ChevronRight, Home, User, Settings } from 'lucide-react';

const DashboardCard = ({ title, value, unit }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm">
    <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
    <div className="flex items-baseline">
      <span className="text-2xl font-bold text-gray-700 mr-1">{value}</span>
      <span className="text-sm text-gray-700">{unit}</span>
    </div>
  </div>
);

const RecentActivity = ({ date, amount }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-sm text-gray-700">{date}</span>
    <span className="text-sm font-semibold">${amount}</span>
  </div>
);

export function Dashboard({ userData }) {
  return (
    <div className="bg-gradient-to-br from-pink-200 to-blue-200 min-h-screen p-6">
      <div className="max-w-md mx-auto">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-700">{userData.name}</h2>
            <p className="text-sm text-gray-700">{userData.phoneNumber}</p>
          </div>
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </header>

        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Premium</h3>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-700">${userData.premiumAmount}</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm">
              Renew
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <DashboardCard title="Call & Data Usage" value={userData.callDataUsage} unit="GB left" />
          <DashboardCard title="Minutes" value={userData.minutes} unit="min" />
        </div>

        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Recent Bills</h3>
            <ChevronRight className="text-gray-800" />
          </div>
          {userData.recentBills.map((bill, index) => (
            <RecentActivity key={index} date={bill.date} amount={bill.amount} />
          ))}
          <button className="w-full text-blue-500 text-sm font-semibold mt-2">
            View Full Speed
          </button>
        </div>

        <nav className="flex justify-around bg-white rounded-full py-2 shadow-lg">
          <button className="p-2">
            <Home className="text-blue-500" />
          </button>
          <a href='/call' className="p-2">
            <Phone className="text-gray-800" />
          </a>
          <a href='/chat' className="p-2">
            <MessageCircle className="text-gray-800" />
          </a>
          <button className="p-2">
            <User className="text-gray-800" />
          </button>
          <button className="p-2">
            <Settings className="text-gray-800" />
          </button>
        </nav>
      </div>
    </div>
  );
}