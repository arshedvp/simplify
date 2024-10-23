'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, Clapperboard, WalletCards, Home, User } from 'lucide-react';

export default function Wallet() {
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [walletData, setWalletData] = useState({
    address: '',
    balance: 0,
  }); // Wallet data state
  const [amountToAdd, setAmountToAdd] = useState(0); // Amount to add to balance
  const [successMessage, setSuccessMessage] = useState(''); // Message for successful balance addition
  const [errorMessage, setErrorMessage] = useState(''); // Message for errors
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // Redirect to /signin if no token is found
      router.push('/signin');
    } else {
      // Fetch wallet data if token exists
      const fetchWalletData = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/wallet`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, // Attach the token to the request
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch wallet data');
          }

          const data = await response.json();
          setWalletData({
            address: data.address,
            balance: data.balance,
          });
          setIsLoading(false); // Stop loading once data is fetched
        } catch (error) {
          console.error('Error fetching wallet data:', error);
          router.push('/signin'); // Token might be invalid, redirect to signin page
        }
      };

      fetchWalletData();
    }
  }, [router]);

  const handleAddBalance = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      // Redirect to signin if no token
      router.push('/signin');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/wallet/add-balance`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amountToAdd }), // Send amount to be added
      });

      if (!response.ok) {
        throw new Error('Failed to add balance');
      }

      const updatedWallet = await response.json();
      setWalletData(updatedWallet); // Update the wallet with the new balance
      setAmountToAdd(0); // Reset the amount input
      setSuccessMessage(`Successfully added $${amountToAdd} to your wallet!`); // Set success message
      setErrorMessage(''); // Clear any previous error messages
      setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
    } catch (error) {
      console.error('Error adding balance:', error);
      setErrorMessage('Failed to add balance. Please try again.'); // Set error message
      setSuccessMessage(''); // Clear any previous success messages
    }
  };

  if (isLoading) {
    return <div className="bg-gradient-to-br from-pink-200 to-blue-200 min-h-screen flex items-center justify-center text-gray-700">Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-pink-200 to-blue-200 min-h-screen p-6">
      <div className="max-w-md mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-700">Wallet</h2>
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </header>

        <div className="bg-black rounded-xl p-4 mb-6 shadow-sm text-white">
          <p><strong>Account Address:</strong> {walletData.address}</p>
          <p><strong>Balance:</strong> ${walletData.balance}</p>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Add Balance</h2>
            <input
              type="number"
              value={amountToAdd}
              onChange={(e) => setAmountToAdd(Number(e.target.value))}
              placeholder="Amount to add"
              className="border border-gray-300 text-black rounded-md p-2 mb-2 w-full"
            />
            <button
              onClick={handleAddBalance}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-full"
            >
              Add Balance
            </button>
            {successMessage && <p className="mt-2 text-green-500">{successMessage}</p>} {/* Show success message */}
            {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>} {/* Show error message */}
          </div>
        </div>

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
            <WalletCards className="text-blue-500" />
          </a>
        </nav>
      </div>
    </div>
  );
}
