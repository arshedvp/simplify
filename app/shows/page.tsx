'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, Clapperboard, WalletCards, ChevronRight, Home, User, Search } from 'lucide-react';

interface Show {
  id: string;
  title: string;
  image: string;
  description: string;
}

export default function NewShows() {
  const [isLoading, setIsLoading] = useState(true);
  const [shows, setShows] = useState<Show[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/signin');
    } else {
      const fetchShows = async () => {
        try {
          const dummyData: Show[] = [
            {
              id: '1',
              title: 'The Mystery Adventure',
              image: '/api/placeholder/300/200',
              description: 'A thrilling journey into the unknown.',
            },
            {
              id: '2',
              title: 'Sci-Fi Explorers',
              image: '/api/placeholder/300/200',
              description: 'Explore distant galaxies and futuristic technology.',
            },
            {
              id: '3',
              title: 'Comedy Night Special',
              image: '/api/placeholder/300/200',
              description: 'A hilarious collection of stand-up comedy shows.',
            },
          ];

          setTimeout(() => {
            setShows(dummyData);
            setIsLoading(false);
          }, 1000);
        } catch (error) {
          console.error('Error fetching shows:', error);
          router.push('/signin');
        }
      };

      fetchShows();
    }
  }, [router]);

  const filteredShows = shows.filter(show =>
    show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    show.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <header className="flex justify-between items-center py-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">New Shows</h2>
            <p className="text-sm font-medium text-gray-500">Latest releases</p>
          </div>
          <div className="relative">
            <img 
              src="/api/placeholder/40/40"
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-white shadow-md"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-lg">
          <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-2">
            <Search className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search shows..."
              className="bg-transparent border-none outline-none flex-1 text-sm text-gray-700 placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Shows Grid */}
        <div className="bg-white rounded-2xl shadow-lg mb-20">
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Featured Shows</h3>
            <button className="text-blue-500 flex items-center gap-1 text-sm font-medium">
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          {filteredShows.length > 0 ? (
            <div className="p-4 space-y-4">
              {filteredShows.map((show) => (
                <div key={show.id} className="flex space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                  <img
                    src={show.image}
                    alt={show.title}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{show.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{show.description}</p>
                    <button
                      className="text-blue-500 text-sm font-medium"
                      onClick={() => router.push(`/shows/${show.id}`)}
                    >
                      Watch Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Clapperboard className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No shows found</p>
              <p className="text-sm text-gray-400">Try adjusting your search</p>
            </div>
          )}
        </div>

        {/* Navigation Bar */}
        <nav className="fixed bottom-4 left-4 right-4 max-w-md mx-auto bg-white rounded-2xl py-4 px-6 shadow-xl">
          <div className="flex justify-between items-center">
            {[
              { icon: Home, label: 'Home', path: '/dashboard' },
              { icon: Phone, label: 'Call', path: '/call' },
              { icon: Clapperboard, label: 'Shows', path: '/shows', active: true },
              { icon: WalletCards, label: 'Wallet', path: '/wallet' },
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