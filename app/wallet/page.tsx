'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, Clapperboard, WalletCards, Home, User, CreditCard, ArrowUpRight, History, DollarSign } from 'lucide-react';

export default function Wallet() {
  const [isLoading, setIsLoading] = useState(true);
  const [walletData, setWalletData] = useState({
    address: '',
    balance: 0,
  });
  const [amountToAdd, setAmountToAdd] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
    } else {
      const fetchWalletData = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/wallet`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
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
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching wallet data:', error);
          router.push('/signin');
        }
      };

      fetchWalletData();
    }
  }, [router]);

  const handleAddBalance = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
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
        body: JSON.stringify({ amount: amountToAdd }),
      });

      if (!response.ok) {
        throw new Error('Failed to add balance');
      }

      const updatedWallet = await response.json();
      setWalletData(updatedWallet);
      setAmountToAdd(0);
      setSuccessMessage(`Successfully added $${amountToAdd} to your wallet!`);
      setErrorMessage('');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error adding balance:', error);
      setErrorMessage('Failed to add balance. Please try again.');
      setSuccessMessage('');
    }
  };

  if (isLoading) {
    return <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <header className="flex justify-between items-center py-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Wallet</h2>
            <p className="text-sm font-medium text-gray-500">Manage your balance</p>
          </div>
          <div className="relative">
            <img 
              src="./images.png"
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-white shadow-md"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
        </header>

        {/* Balance Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">{walletData.address}</span>
          </div>
          <div className="mb-4">
            <p className="text-gray-500 text-sm mb-1">Available Balance</p>
            <h3 className="text-3xl font-bold text-gray-800">${walletData.balance.toFixed(2)}</h3>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <ArrowUpRight className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-sm font-medium text-gray-500">Send</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <History className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-sm font-medium text-gray-500">History</div>
          </div>
        </div>

        {/* Add Balance Section */}
        <div className="bg-white rounded-2xl shadow-lg mb-20">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Add Balance</h3>
            <p className="text-sm text-gray-500">Top up your wallet</p>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-3 mb-4">
              <DollarSign className="text-gray-400 w-5 h-5" />
              <input
                type="number"
                value={amountToAdd}
                onChange={(e) => setAmountToAdd(Number(e.target.value))}
                placeholder="Enter amount"
                className="bg-transparent border-none outline-none flex-1 text-gray-700"
              />
            </div>
            <button
              onClick={handleAddBalance}
              className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors"
            >
              Add Balance
            </button>
            {successMessage && <p className="mt-3 text-center text-green-500 text-sm">{successMessage}</p>}
            {errorMessage && <p className="mt-3 text-center text-red-500 text-sm">{errorMessage}</p>}
          </div>
        </div>

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