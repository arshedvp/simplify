'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Wallet() {
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [walletData, setWalletData] = useState({
    address: '',
    balance: 0,
  }); // Wallet data state
  const [amountToAdd, setAmountToAdd] = useState(0); // Amount to add to balance
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(localStorage.getItem('token'));


    if (!token) {
      // Redirect to /signin if no token is found
    //   router.push('/signin');
    } else {
      // Fetch wallet data if token exists
      const fetchWalletData = async () => {
        try {
        //   const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/wallet`, {
        //     method: 'GET',
        //     headers: {
        //       'Authorization': `Bearer ${token}`, // Attach the token to the request
        //       'Content-Type': 'application/json',
        //     },
        //   });

        //   if (!response.ok) {
        //     throw new Error('Invalid token or failed to fetch wallet data');
        //   }

        //   const data = await response.json();
        const  data = {
            address : "hjsdkfksjd",
            balance : 400, 
        }
          setWalletData({
            address: data.address,
            balance: data.balance,
          });
          setIsLoading(false); // Stop loading once data is fetched
        } catch (error) {
          console.error('Error:', error);
          // Token might be invalid, redirect to signin page
          router.push('/signin');
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
    } catch (error) {
      console.error('Error adding balance:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Wallet</h1>
      <p><strong>Account Address:</strong> {walletData.address}</p>
      <p><strong>Balance:</strong> ${walletData.balance}</p>

      <div>
        <h2>Add Balance</h2>
        <input
          type="number"
          value={amountToAdd}
          onChange={(e) => setAmountToAdd(Number(e.target.value))}
          placeholder="Amount to add"
        />
        <button onClick={handleAddBalance}>Add Balance</button>
      </div>
    </div>
  );
}
