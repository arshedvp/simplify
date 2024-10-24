"use client";
import React, { useEffect, useState } from 'react';
import { Phone, Clapperboard, WalletCards, ChevronRight, Home, User, Settings, Mail, UserCircle } from 'lucide-react';

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState('');
  const [activeSection, setActiveSection] = useState('personal');

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getUser`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setName(data.name || "");
        setEmail(data.email || "");
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You need to be logged in to update your profile.');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateUser`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      const updatedUser = await response.json();
      setName(updatedUser.name || "");
      setEmail(updatedUser.email || "");
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <header className="flex justify-between items-center py-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
            <p className="text-sm font-medium text-gray-500">Personal Information</p>
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

        {/* Profile Stats */}
        <div className="mb-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <UserCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-sm font-medium text-gray-500">Profile</div>
              <div className="text-2xl font-bold text-blue-600">100%</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                <Settings className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-sm font-medium text-gray-500">Settings</div>
              <div className="text-2xl font-bold text-green-600">5</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                <Mail className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-sm font-medium text-gray-500">Verified</div>
              <div className="text-2xl font-bold text-purple-600">Yes</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto px-1">
          {['personal', 'security', 'preferences'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeSection === tab
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-2xl shadow-lg mb-20">
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Profile Details</h3>
            <button className="text-blue-500 flex items-center gap-1 text-sm font-medium">
              Edit
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
                <UserCircle className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
                <Mail className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition-colors font-medium"
            >
              Save Changes
            </button>

            {message && (
              <div className={`p-4 rounded-xl ${message.includes('successfully') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {message}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="fixed bottom-4 left-4 right-4 max-w-md mx-auto bg-white rounded-2xl py-4 px-6 shadow-xl">
          <div className="flex justify-between items-center">
            {[
              { icon: Home, label: 'Home', path: '/dashboard' },
              { icon: Phone, label: 'Call', path: '/call' },
              { icon: Clapperboard, label: 'Shows', path: '/shows' },
              { icon: WalletCards, label: 'Wallet', path: '/wallet' },
              { icon: User, label: 'Profile', path: '/profile', active: true },
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