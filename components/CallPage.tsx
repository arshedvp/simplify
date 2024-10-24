import React, { useState } from 'react';
import { Phone, Clapperboard,WalletCards, ChevronRight, Home, User, Settings , Search} from 'lucide-react';

const CallEntry = ({ name, number, time, type }) => {
  const getCallTypeStyles = (type) => {
    switch (type) {
      case 'incoming':
        return 'bg-green-100 text-green-600';
      case 'outgoing':
        return 'bg-blue-100 text-blue-600';
      case 'missed':
        return 'bg-pink-100 text-pink-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };
  

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getCallTypeStyles(type)}`}>
          {type === 'incoming' && '↓'}
          {type === 'outgoing' && '↑'}
          {type === 'missed' && 'x'}
        </div>
        <div>
          <h3 className="text-gray-700 font-medium">{name}</h3>
          <p className="text-sm text-gray-500">{number}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">{time}</p>
      </div>
    </div>
  );
};

export function CallPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const calls = [
    { name: 'John Marius', number: '0123456789', time: '10:30 AM', type: 'incoming' },
    { name: 'Wilson', number: '9876543210', time: 'Yesterday', type: 'missed' },
    { name: 'David Lee', number: '4567890123', time: 'Yesterday', type: 'outgoing' },
    { name: 'Emma Thompson', number: '3334445555', time: '2 days ago', type: 'incoming' },
  ];

  const filteredCalls = calls.filter(call =>
    call.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    call.number.includes(searchQuery)
  );

  return (
    <div className="bg-gradient-to-br from-pink-200 to-blue-200 min-h-screen p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-700">Call History</h2>
            <p className="text-sm text-gray-700">Recent activities</p>
          </div>
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </header>

        {/* Search Bar */}
        <div className="bg-white rounded-xl p-3 mb-6 shadow-sm flex items-center space-x-2">
          <Search className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search calls..."
            className="bg-transparent border-none outline-none flex-1 text-sm text-gray-700 placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />
        </div>

        {/* Call Stats */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Call Statistics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-3 shadow-sm text-center">
              <div className="text-sm text-gray-500">Incoming</div>
              <div className="text-lg font-bold text-green-600">12</div>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm text-center">
              <div className="text-sm text-gray-500">Outgoing</div>
              <div className="text-lg font-bold text-blue-600">8</div>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm text-center">
              <div className="text-sm text-gray-500">Missed</div>
              <div className="text-lg font-bold text-pink-600">3</div>
            </div>
          </div>
        </div>

        {/* Call List */}
        <div className="bg-white rounded-xl shadow-sm mb-20">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Recent Calls</h3>
              <ChevronRight className="text-gray-400" />
            </div>
            {filteredCalls.length > 0 ? (
              filteredCalls.map((call, index) => (
                <CallEntry key={index} {...call} />
              ))
            ) : (
              <p className="text-gray-500 text-center">No calls found.</p>
            )}
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="flex justify-around bg-white rounded-full py-2 shadow-lg">
          <a href='/dashboard' className="p-2">
            <Home className="text-blue-500" />
          </a>
          <button className="p-2"> 
            <Phone className="text-gray-800" />
          </button>
          <a href='/shows' className="p-2">
            <Clapperboard className="text-gray-800" />
          </a>
          <a href='/profile' className="p-2">
            <User className="text-gray-800" />
          </a>

          <a href='/wallet' className="p-2" >
            <WalletCards className="text-gray-800" />
          </a>
        </nav>
      </div>
    </div>
  );
}
