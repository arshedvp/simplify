import React, { useState } from 'react';
import { Phone, Clapperboard,WalletCards, ChevronRight, Home, User, Settings } from 'lucide-react';
import { CallPage } from './CallPage';

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
  const [showCallPage, setShowCallPage] = useState(false);  // Track whether to show the CallPage

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
          <h3 className="text-lg font-semibold mb-2 text-gray-700">{userData.premiumAmount}</h3>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-700">${userData.minutes}</span>
            <a href='/renew' className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm">
              Renew
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <DashboardCard title="Call & Data Usage" value={userData.callDataUsage} unit="GB left" />
          <DashboardCard title="Minutes" value={userData.minutes} unit="min" />
        </div>

        {/* Conditionally render Recent Bills or Call Page */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          {showCallPage ? (
            <>
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Call History</h3>
              <CallPage /> {/* Render CallPage component */}
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Recent Bills</h3>
                <ChevronRight className="text-gray-800" />
              </div>
              {userData.recentBills.map((bill, index) => (
                <RecentActivity key={index} date={bill.date} amount={bill.amount} />
              ))}
            
            </>
          )}
        </div>

        {/* Navigation Bar */}
        <nav className="flex justify-around bg-white rounded-full py-2 shadow-lg">
          <a href='/dashboard' className="p-2">
            <Home className="text-blue-500" />
          </a>
          <a href='/call' className="p-2" onClick={() => setShowCallPage(false)}> {/* Handle Phone click */}
            <Phone className="text-gray-800" />
          </a>
          <a href='/shows' className="p-2">
            <Clapperboard className="text-gray-800" />
          </a>
          <a href='/profile' className="p-2" onClick={() => setShowCallPage(false)}>
            <User className="text-gray-800" />
          </a>

          <a href='/wallet' className="p-2"  onClick={() => setShowCallPage(false)}>
            <WalletCards className="text-gray-800" />
          </a>
        </nav>
      </div>
    </div>
  );
}
