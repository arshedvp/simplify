'use client';
import Link from 'next/link';
import { Home, Phone, MessageCircle, User, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function BottomBar() {
  const pathname = usePathname(); // Get the current path for active styles

  return (
    <nav className="flex justify-around bg-white rounded-full py-2 shadow-lg mt-6">
      <Link href="/" className="p-2">
        <Home className={pathname === '/' ? 'text-blue-500' : 'text-gray-800'} />
      </Link>
      <Link href="/callLogs" className="p-2">
        <Phone className={pathname === '/callLogs' ? 'text-blue-500' : 'text-gray-800'} />
      </Link>
      <Link href="/chat" className="p-2">
        <MessageCircle className={pathname === '/chat' ? 'text-blue-500' : 'text-gray-800'} />
      </Link>
      <Link href="/recharge" className="p-2">
        <User className={pathname === '/recharge' ? 'text-blue-500' : 'text-gray-800'} />
      </Link>
      <button className="p-2">
        <Settings className="text-gray-800" />
      </button>
    </nav>
  );
}
