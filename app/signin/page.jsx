'use client'
import React, { useState } from 'react';
import { Phone } from 'lucide-react';

export default function SignIn() {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-between mb-6">
          <button className="text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div>
            <button className="text-teal-500 font-semibold mr-4">LOGIN</button>
            <button className="text-teal-500 font-semibold">SIGN UP</button>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <div className="bg-teal-100 inline-block p-4 rounded-full mb-4">
            <Phone className="text-teal-500 h-8 w-8" />
          </div>
          <p className="text-gray-600">You'll receive a 4 digit code to verify next.</p>
        </div>
        
        <div className="mb-6">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Enter your mobile number</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              +91
            </span>
            <input
              type="tel"
              id="phone"
              className="flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
              placeholder="1234567890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        
        <button
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => console.log('Continue clicked')}
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}