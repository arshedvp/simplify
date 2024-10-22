import React from 'react';
import { ChevronRight, CheckCircle } from 'lucide-react';

const PlanCard = ({ plan }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
    <div className="flex justify-between items-center mb-3">
      <div>
        <h3 className="text-sm text-gray-500">Premium Plan</h3>
        <div className="flex items-baseline mt-1">
          <span className="text-2xl font-bold text-gray-700">${plan.price}</span>
          <span className="text-sm text-gray-500 ml-2">/{plan.validity}</span>
        </div>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm">
        Select
      </button>
    </div>

    <div className="bg-gray-50 rounded-lg p-3 mb-3">
      <div className="text-lg font-semibold text-gray-700">{plan.data}</div>
      <div className="text-sm text-gray-500">Daily Data</div>
    </div>

    <div className="space-y-2">
      {plan.features.map((feature, index) => (
        <div key={index} className="flex items-center text-sm text-gray-700">
          <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
          {feature}
        </div>
      ))}
    </div>
  </div>
);

export default function Recharge() {
  const plans = [
    {
      id: 1,
      price: 199,
      data: '1.5GB/day',
      validity: '28 days',
      features: [
        'Unlimited Local Calls',
        'Free SMS (100/day)',
        'Prime Video Mobile'
      ]
    },
    {
      id: 2,
      price: 499,
      data: '2GB/day',
      validity: '56 days',
      features: [
        'Unlimited Local & STD Calls',
        'Free SMS (100/day)',
        'Prime Video Mobile',
        'Disney+ Hotstar'
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-br from-pink-200 to-blue-200 min-h-screen p-6">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-700">Recharge Plans</h2>
          <ChevronRight className="text-gray-800" />
        </div>

        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Popular Plans</h3>
            <button className="text-blue-500 text-sm font-semibold">
              View All
            </button>
          </div>
          
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
}