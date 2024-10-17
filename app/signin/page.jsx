'use client';
import React, { useState } from 'react';

export default function SignIn() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);

  const handleContinueClick = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || ''; // Access environment variable

      // Send request to get OTP
      const response = await fetch(`${backendUrl}/getOTP`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to request OTP');
      }

      const result = await response.json();
      console.log('OTP sent:', result); // Handle success response

      setShowOtpField(true); // Show OTP input field
    } catch (error) {
      console.error('Error:', error); // Handle error response
    }
  };

  const handleSubmit = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || ''; // Access environment variable

      // Submit phone number and OTP
      const response = await fetch(`${backendUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone,
          otp,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit OTP');
      }

      const result = await response.json();
      console.log('Success:', result); // Handle success response
    } catch (error) {
      console.error('Error:', error); // Handle error response
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Header and Phone Number Input */}
        <div className="text-center mb-8">
          <div className="bg-teal-100 inline-block p-4 rounded-full mb-4">
            <svg className="text-teal-500 h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-gray-600">You'll receive a 4 digit code to verify next.</p>
        </div>

        {/* Phone Number Input */}
        <div className="mb-6">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Enter your mobile number</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              +91
            </span>
            <input
              type="tel"
              id="phone"
              className="flex-1 block w-full text-black rounded-none rounded-r-md sm:text-sm border-gray-300"
              placeholder="1234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <button
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded mb-6"
          onClick={handleContinueClick}
        >
          CONTINUE
        </button>

        {/* OTP Input */}
        {showOtpField && (
          <div className="mb-6">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
            <input
              type="text"
              id="otp"
              className="block w-full text-black rounded-md sm:text-sm border-gray-300"
              placeholder="Enter 6 digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}

        {/* Submit Button */}
        {showOtpField && (
          <button
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        )}
      </div>
    </div>
  );
}
