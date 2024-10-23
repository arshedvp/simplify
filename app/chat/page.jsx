import React from 'react';
import { Phone, MessageCircle, Clock, ChevronRight, Home, User, Settings, Bell, Search } from 'lucide-react';

const NotificationCard = ({ message, time, type = 'info' }) => {
  const getTypeStyles = (type) => {
    switch (type) {
      case 'warning':
        return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'offer':
        return 'bg-green-100 text-green-600 border-green-200';
      default:
        return 'bg-blue-100 text-blue-600 border-blue-200';
    }
  };

  return (
    <div className={`p-4 rounded-xl mb-3 border ${getTypeStyles(type)}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
          <span className="text-xs opacity-75 mt-1 block">{time}</span>
        </div>
        <ChevronRight className="w-4 h-4 mt-1" />
      </div>
    </div>
  );
};

const ChatPreview = ({ name, message, time, unread }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
    <div className="flex items-center space-x-3">
      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
        {name.charAt(0)}
      </div>
      <div className="flex-1">
        <h3 className="text-gray-700 font-medium">{name}</h3>
        <p className="text-sm text-gray-500 truncate w-48">{message}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-xs text-gray-500 mb-1">{time}</p>
      {unread > 0 && (
        <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
          {unread}
        </span>
      )}
    </div>
  </div>
);

export default function Chat() {
  const notifications = [
    { 
      id: 1, 
      message: 'Your plan expires in 5 days. Renew now to avoid interruption.',
      time: 'Just now',
      type: 'warning'
    },
    { 
      id: 2, 
      message: 'New recharge offer: Get 10% cashback on your next recharge!',
      time: '2 hours ago',
      type: 'offer'
    },
  ];

  const chats = [
    {
      id: 1,
      name: 'Customer Support',
      message: 'Hi! How can we help you today?',
      time: '10:30 AM',
      unread: 2
    },
    {
      id: 2,
      name: 'Plan Updates',
      message: 'Your recent plan change has been confirmed',
      time: 'Yesterday',
      unread: 0
    },
    {
      id: 3,
      name: 'Billing Service',
      message: 'Your latest invoice is ready to view',
      time: '2 days ago',
      unread: 1
    }
  ];

  return (
    <div className="bg-gradient-to-br from-pink-200 to-blue-200 min-h-screen p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-700">Messages</h2>
            <p className="text-sm text-gray-700">Recent notifications and chats</p>
          </div>
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </header>

        {/* Search Bar */}
        <div className="bg-white rounded-xl p-3 mb-6 shadow-sm flex items-center space-x-2">
          <Search className="text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search messages..." 
            className="bg-transparent border-none outline-none flex-1 text-sm text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Notifications Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Notifications</h3>
            <Bell className="text-gray-600 w-5 h-5" />
          </div>
          {notifications.map((notification) => (
            <NotificationCard 
              key={notification.id} 
              message={notification.message}
              time={notification.time}
              type={notification.type}
            />
          ))}
        </div>

        {/* Chats Section */}
        <div className="bg-white rounded-xl shadow-sm mb-20">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Recent Chats</h3>
              <ChevronRight className="text-gray-400" />
            </div>
            {chats.map((chat) => (
              <ChatPreview key={chat.id} {...chat} />
            ))}
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex justify-around bg-white rounded-full py-2 px-6 shadow-lg w-[calc(100%-3rem)] max-w-md">
          <a href="/" className="p-2">
            <Home className="text-gray-800" />
          </a>
          <a href="/call" className="p-2">
            <Phone className="text-gray-800" />
          </a>
          <a href="/chat" className="p-2">
            <MessageCircle className="text-blue-500" />
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