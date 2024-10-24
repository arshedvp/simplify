'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading spinner
  const [message, setMessage] = useState(''); // State for success or error message
  const [messageType, setMessageType] = useState(''); // Type of message (success or error)
  const router = useRouter();

  const handleContinueClick = async () => {
    setLoading(true); // Start loading
    setMessage(''); // Clear any previous message
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
      
      // Simulate API request
      const response = await fetch(`${backendUrl}/getOTP`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      if (!response.ok) {
        throw new Error('Failed to request OTP');
      }

      setMessage('OTP sent successfully!'); // Success message
      setMessageType('success');
      setShowOtpField(true);
    } catch (error) {
      setMessage('Failed to send OTP. Please try again.'); // Error message
      setMessageType('error');
      console.error('Error:', error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleSubmit = async () => {
    setLoading(true); // Start loading
    setMessage(''); // Clear any previous message
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';

      // Simulate API request
      const response = await fetch(`${backendUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"phone": phone,"password": otp }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit OTP');
      }

      const result = await response.json();
      localStorage.setItem('token', result.token);

      setMessage('Login successful! Redirecting...'); // Success message
      setMessageType('success');

      // Navigate to the dashboard after successful login
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (error) {
      setMessage('Failed to validate OTP. Please try again.'); // Error message
      setMessageType('error');
      console.error('Error:', error);
    } finally {
      setLoading(false); // End loading
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
          <p className="text-gray-600">You'll receive a 4-digit code to verify next.</p>
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
          disabled={loading}
        >
          {loading ? 'Generating OTP...' : 'CONTINUE'}
        </button>

        {/* OTP Input */}
        {showOtpField && (
          <div className="mb-6">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
            <input
              type="text"
              id="otp"
              className="block w-full text-black rounded-md sm:text-sm border-gray-300"
              placeholder="Enter 6-digit OTP"
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
            disabled={loading}
          >
            {loading ? 'Validating OTP...' : 'SUBMIT'}
          </button>
        )}

        {/* Display Message */}
        {message && (
          <div
            className={`mt-4 p-3 rounded ${
              messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
