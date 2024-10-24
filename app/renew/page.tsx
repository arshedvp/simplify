"use client"
import React, { useState } from 'react';
import { Phone, Clapperboard, WalletCards, Home, User, Crown, Shield, Zap, ChevronRight } from 'lucide-react';

const PlanCard = ({ title, price, features, onRenew, icon: Icon, color }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
    <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mb-4`}>
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
    <div className="flex items-baseline mb-4">
      <span className="text-3xl font-bold text-gray-800">${price}</span>
      <span className="text-sm text-gray-500 ml-1">/month</span>
    </div>
    <ul className="space-y-2 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-sm text-gray-600">
          <ChevronRight className="w-4 h-4 mr-2 text-blue-500" />
          {feature}
        </li>
      ))}
    </ul>
    <button
      onClick={onRenew}
      className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors font-medium"
    >
      Renew Plan
    </button>
  </div>
);

export default function PlansPage() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [activePlan, setActivePlan] = useState('premium');

  const handleRenew = async (plan, price) => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('You must be logged in to renew a plan.');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/renew`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan: plan, value: price }),
      });

      if (!response.ok) {
        throw new Error('Failed to renew the plan');
      }

      const data = await response.json();
      setMessage(`Successfully renewed ${plan} plan!`);
      setError('');
    } catch (error) {
      console.error('Error renewing plan:', error);
      setError('Failed to renew the plan. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <header className="flex justify-between items-center py-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Subscription Plans</h2>
            <p className="text-sm font-medium text-gray-500">Choose your perfect plan</p>
          </div>
          <div className="relative">
            <img 
              src="/api/placeholder/40/40"
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-white shadow-md"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
        </header>

        {/* Plan Stats */}
        <div className="mb-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                <Crown className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-sm font-medium text-gray-500">Current</div>
              <div className="text-2xl font-bold text-purple-600">Premium</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-sm font-medium text-gray-500">Valid till</div>
              <div className="text-2xl font-bold text-blue-600">30d</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-sm font-medium text-gray-500">Status</div>
              <div className="text-2xl font-bold text-green-600">Active</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto px-1">
          {['premium', 'silver', 'gold'].map((plan) => (
            <button
              key={plan}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activePlan === plan
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
              onClick={() => setActivePlan(plan)}
            >
              {plan.charAt(0).toUpperCase() + plan.slice(1)}
            </button>
          ))}
        </div>

        {/* Plans Grid */}
        <div className="grid gap-4 mb-20">
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
            icon={Crown}
            color="bg-purple-100 text-purple-600"
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
            icon={Shield}
            color="bg-blue-100 text-blue-600"
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
            icon={Zap}
            color="bg-green-100 text-green-600"
          />
        </div>

        {(message || error) && (
          <div className={`fixed bottom-24 left-4 right-4 max-w-md mx-auto p-4 rounded-xl ${
            message ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}>
            {message || error}
          </div>
        )}

        {/* Navigation Bar */}
        <nav className="fixed bottom-4 left-4 right-4 max-w-md mx-auto bg-white rounded-2xl py-4 px-6 shadow-xl">
          <div className="flex justify-between items-center">
            {[
              { icon: Home, label: 'Home', path: '/dashboard' },
              { icon: Phone, label: 'Call', path: '/call' },
              { icon: Clapperboard, label: 'Shows', path: '/shows' },
              { icon: WalletCards, label: 'Wallet', path: '/wallet', active: true },
              { icon: User, label: 'Profile', path: '/profile' },
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