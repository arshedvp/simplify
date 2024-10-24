'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, ArrowRight, Lock, CheckCircle, AlertCircle } from 'lucide-react';

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
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
            <p className="text-sm font-medium text-gray-500">Enter your details to continue</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Phone className="w-6 h-6 text-blue-600" />
          </div>
        </header>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          {/* Phone Input */}
          <div className="mb-6">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>
            <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-3">
              <Phone className="text-gray-400 w-5 h-5" />
              <input
                type="tel"
                id="phone"
                className="bg-transparent border-none outline-none flex-1 text-gray-700 placeholder-gray-400"
                placeholder="Enter your mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* Continue Button */}
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors"
            onClick={handleContinueClick}
            disabled={loading}
          >
            {loading ? (
              'Sending OTP...'
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* OTP Section */}
          {showOtpField && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="mb-6">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-3">
                  <Lock className="text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="otp"
                    className="bg-transparent border-none outline-none flex-1 text-gray-700 placeholder-gray-400"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </div>

              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  'Verifying...'
                ) : (
                  <>
                    <span>Verify OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Message Display */}
        {message && (
          <div
            className={`rounded-xl p-4 flex items-center space-x-3 ${
              messageType === 'success' ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            {messageType === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
            <span
              className={`text-sm font-medium ${
                messageType === 'success' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {message}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
