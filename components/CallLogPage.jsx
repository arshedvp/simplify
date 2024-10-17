import React from 'react';
import { Phone } from 'lucide-react';
import { NavigationBar } from './NavigationBar';
import { PageHeader } from './PageHeader';

const CallLogPage = () => {
    const calls = [
      { number: '+1 234 567 890', type: 'outgoing', duration: '5:23', time: '2:30 PM' },
      { number: '+1 987 654 321', type: 'incoming', duration: '2:45', time: '11:20 AM' },
      { number: '+1 555 123 456', type: 'missed', time: '9:15 AM' }
    ];
  
    const getCallIcon = (type) => {
      switch(type) {
        case 'outgoing':
          return <Phone className="rotate-90 text-green-500" />;
        case 'incoming':
          return <Phone className="-rotate-90 text-blue-500" />;
        case 'missed':
          return <Phone className="-rotate-90 text-red-500" />;
      }
    };
  
    return (
      <div className="bg-gradient-to-br from-pink-200 to-blue-200 min-h-screen p-6">
        <div className="max-w-md mx-auto">
          <PageHeader title="Call Log" />
          
          <div className="bg-white rounded-xl shadow-sm">
            {calls.map((call, index) => (
              <div key={index} className="p-4 border-b last:border-b-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getCallIcon(call.type)}
                    <div className="ml-3">
                      <p className="font-semibold text-gray-700">{call.number}</p>
                      <p className="text-sm text-gray-500">{call.time}</p>
                    </div>
                  </div>
                  {call.duration && (
                    <span className="text-sm text-gray-600">{call.duration}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
  
          <NavigationBar activePage="calls" />
        </div>
      </div>
    );
  };
  
  export { RenewPage, ChatPage, CallLogPage };
  