'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dashboard } from '../../components/Dashboard';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true); // Loading state to prevent flashing content
  const [userData, setUserData] = useState(null);   // Store user data
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // Redirect to /signin if no token is found
      router.push('/signin');
    } else {
      // Simulate fetching user data, in reality you'd use token for API requests
      const fetchUserData = async () => {
        // Fetch user data or validate token logic here
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            router.push('/signin');
            throw new Error('Failed to fetch user data');
          }

          const data = await response.json();

          if (!data.name){
            router.push('/signin');
            throw new Error('Failed to fetch user data');
          }
          const userData = {
            name: data.name,
            phoneNumber: data.phone,
            plan_name : data.current_plan,
            premiumAmount: data.balance,
            callDataUsage: data.dataUsage,
            minutes: data.balance,
            recentBills: [
              { date: "13 Feb - 13 Mar 2023", amount: 149 },
              { date: "13 Jan - 13 Feb 2020", amount: 149 },
              { date: "13 Dec - 13 Jan 2020", amount: 149 },
            ],
          };
          setUserData(userData);
          setIsLoading(false);

          // setUserData(data); // Assuming the API returns the data in the required format
        } catch (error) {
          console.error('Error fetching user data:', error);
          router.push('/signin'); // Redirect to signin if there is an error
        } finally {
          setIsLoading(false); // Stop loading indicator
        }
       
      };

      fetchUserData();
    }
  }, [router]);

  if (isLoading) {
    return <div className="bg-white min-h-screen flex items-center justify-center text-gray-700">Loading...</div>;// Display a loading spinner or message
  }
  else{

  return <Dashboard userData={userData} />;
  }
}

