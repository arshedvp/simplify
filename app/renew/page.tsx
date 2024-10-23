"use client"
import React, { useState, useEffect } from 'react';
import { Phone, Clapperboard, WalletCards, Home, User } from 'lucide-react';

const PlanCard = ({ title, price, features, onRenew }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
    <h3 className="text-lg font-semibold mb-2 text-gray-700">{title}</h3>
    <div className="flex items-baseline mb-2">
      <span className="text-2xl font-bold text-gray-700">${price}</span>
      <span className="text-sm text-gray-700">/month</span>
    </div>
    <ul className="list-disc pl-5 mb-4">
      {features.map((feature, index) => (
        <li key={index} className="text-sm text-gray-600">{feature}</li>
      ))}
    </ul>
    <button
      onClick={onRenew}
      className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm"
    >
      Renew
    </button>
  </div>
);

const PlansPage = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Function to handle renewing a plan
  const handleRenew = async (plan, price) => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('You must be logged in to renew a plan.');
      return;
    }
     console.log(plan,price)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/renew`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({plan: plan, value: price }), // Sending plan and value (price)
      });

      if (!response.ok) {
        throw new Error('Failed to renew the plan');
      }

      const data = await response.json();
      setMessage(`Successfully renewed ${plan} plan!`);
      setError(''); // Clear any previous error message
    } catch (error) {
      console.error('Error renewing plan:', error);
      setError('Failed to renew the plan. Please try again.');
      setMessage(''); // Clear any previous success message
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-200 to-blue-200 min-h-screen p-6">
      <div className="max-w-md mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-700">Subscription Plans</h2>
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </header>

        <PlanCard
          title="Premium"
          price={29.99}
          features={[
            'Unlimited calls',
            'Unlimited data',
            'Priority support',
            'Access to premium content',
          ]}
          onRenew={() => handleRenew('Premium', 29.99)}
        />
        
        <PlanCard
          title="Silver"
          price={19.99}
          features={[
            '500 minutes of calls',
            '5 GB of data',
            'Standard support',
          ]}
          onRenew={() => handleRenew('Silver', 19.99)}
        />
        
        <PlanCard
          title="Gold"
          price={39.99}
          features={[
            'Unlimited calls',
            '10 GB of data',
            'Premium support',
            'Access to exclusive content',
          ]}
          onRenew={() => handleRenew('Gold', 39.99)}
        />

        {message && <p className="text-green-600 text-sm mt-4">{message}</p>}
        {error && <p className="text-red-600 text-sm mt-4">{error}</p>}

        {/* Navigation Bar */}
        <nav className="flex justify-around bg-white rounded-full py-2 shadow-lg">
          <a href='/dashboard' className="p-2">
            <Home className="text-gray-800" />
          </a>
          <a href='/call' className="p-2">
            <Phone className="text-gray-800" />
          </a>
          <a href='/shows' className="p-2">
            <Clapperboard className="text-gray-800" />
          </a>
          <a href='/profile' className="p-2">
            <User className="text-gray-800" />
          </a>
          <a href='/wallet' className="p-2">
            <WalletCards className="text-gray-800" />
          </a>
        </nav>
      </div>
    </div>
  );
};

export default PlansPage;
