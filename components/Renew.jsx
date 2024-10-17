
import React from 'react';
import { NavigationBar } from './NavigationBar';
import { PageHeader } from './PageHeader';

const RenewPage = () => {
    const plans = [
      { name: 'Basic', data: '20GB', minutes: '100', price: 19.9 },
      { name: 'Premium', data: '50GB', minutes: '200', price: 29.9 },
      { name: 'Ultimate', data: '100GB', minutes: 'Unlimited', price: 39.9 }
    ];
  
    return (
      <div className="bg-gradient-to-br from-pink-200 to-blue-200 min-h-screen p-6">
        <div className="max-w-md mx-auto">
          <PageHeader title="Choose Your Plan" hasBack />
          
          <div className="space-y-4">
            {plans.map((plan) => (
              <div key={plan.name} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">{plan.name}</h3>
                  <span className="text-xl font-bold text-gray-700">${plan.price}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Data: {plan.data}</span>
                  <span>Minutes: {plan.minutes}</span>
                </div>
                <button className="w-full bg-blue-500 text-white py-2 rounded-full mt-4">
                  Select Plan
                </button>
              </div>
            ))}
          </div>
          
          <NavigationBar activePage="home" />
        </div>
      </div>
    );
  };
  
  