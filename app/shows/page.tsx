'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, Clapperboard,WalletCards, ChevronRight, Home, User, Settings } from 'lucide-react';

interface Show {
  id: string;
  title: string;
  image: string;
  description: string;
}

export default function NewShows() {
  const [isLoading, setIsLoading] = useState(true); // Loading state to prevent flashing content
  const [shows, setShows] = useState<Show[]>([]);   // Store fetched shows
  const router = useRouter();

  const [showCallPage, setShowCallPage] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    if (!token) {
      router.push('/signin'); // Redirect to /signin if no token is found
    } else {
      const fetchShows = async () => {
        try {
          // Use dummy data to simulate fetched show data
          const dummyData: Show[] = [
            {
              id: '1',
              title: 'The Mystery Adventure',
              image: 'https://via.placeholder.com/300x200.png?text=Mystery+Adventure',
              description: 'A thrilling journey into the unknown.',
            },
            {
              id: '2',
              title: 'Sci-Fi Explorers',
              image: 'https://via.placeholder.com/300x200.png?text=Sci-Fi+Explorers',
              description: 'Explore distant galaxies and futuristic technology.',
            },
            {
              id: '3',
              title: 'Comedy Night Special',
              image: 'https://via.placeholder.com/300x200.png?text=Comedy+Night+Special',
              description: 'A hilarious collection of stand-up comedy shows.',
            },
          ];

          // Simulating API response delay
          setTimeout(() => {
            setShows(dummyData);
            setIsLoading(false);
          }, 1000); // Simulate a 1-second delay for data fetching
        } catch (error) {
          console.error('Error fetching shows:', error);
          router.push('/signin');
        }
      };

      fetchShows();
    }
  }, [router]);

  if (isLoading) {
    return <div className="bg-gradient-to-br from-pink-200 to-blue-200 min-h-screen flex items-center justify-center text-gray-700">Loading...</div>; // Loading spinner or message
  }

  return (
    <div className="bg-gradient-to-br from-pink-200 to-blue-200 min-h-screen p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800">New Shows</h1>
        <div className="grid grid-cols-1 gap-6">
          {shows.map((show) => (
            <div key={show.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img className="w-full h-48 object-cover" src={show.image} alt={show.title} />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900">{show.title}</h2>
                <p className="text-gray-700 text-sm mt-2">{show.description}</p>
                <button
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-500 transition"
                  onClick={() => router.push(`/shows/${show.id}`)}
                >
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Bar */}
        <nav className="flex justify-around bg-white rounded-full py-2 shadow-lg">
          <a href='/dashboard' className="p-2">
            <Home className="text-blue-500" />
          </a>
          <button className="p-2" onClick={() => setShowCallPage(true)}> {/* Handle Phone click */}
            <Phone className="text-gray-800" />
          </button>
          <a href='/shows' className="p-2">
            <Clapperboard className="text-gray-800" />
          </a>
          <a href='/profile' className="p-2" onClick={() => setShowCallPage(false)}>
            <User className="text-gray-800" />
          </a>

          <a href='/wallet' className="p-2"  onClick={() => setShowCallPage(false)}>
            <WalletCards className="text-gray-800" />
          </a>
        </nav>
      </div>
    </div>
  );
}
