"use client";
import React, { useEffect, useState } from 'react';
import { Phone, Clapperboard, WalletCards, ChevronRight, Home, User } from 'lucide-react';

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState('');
  const [showCallPage, setShowCallPage] = useState(false);

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
        setName(data.name || "");  // Set name if exists
        setEmail(data.email || ""); // Set email if exists
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
        body: JSON.stringify({ name: name, email }), 
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      const updatedUser = await response.json();
      setName(updatedUser.name || "");  // Assuming phone is updated name
      setEmail(updatedUser.email || "");  // Assuming email is updated
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-200 to-blue-200 min-h-screen p-6">
      <div className="max-w-md mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-700">Profile</h2>
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </header>

        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <div className="mb-4">
            <label className="block text-sm text-gray-500">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border text-black border-gray-300 rounded-md p-2"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-500">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border text-black border-gray-300 rounded-md p-2"
              placeholder="Enter your email"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-full"
          >
            Save Changes
          </button>

          {message && <p className={`text-sm mt-2 ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
        </div>

        {/* Navigation Bar */}
        <nav className="flex justify-around bg-white rounded-full py-2 shadow-lg">
          <a href='/dashboard' className="p-2">
            <Home className="text-gray-800" />
          </a>
          <button className="p-2" onClick={() => setShowCallPage(true)}>
            <Phone className="text-gray-800" />
          </button>
          <a href='/shows' className="p-2">
            <Clapperboard className="text-gray-800" />
          </a>
          <a href='/profile' className="p-2" onClick={() => setShowCallPage(false)}>
            <User className="text-blue-500" />
          </a>
          <a href='/wallet' className="p-2" onClick={() => setShowCallPage(false)}>
            <WalletCards className="text-gray-800" />
          </a>
        </nav>
      </div>
    </div>
  );
}
