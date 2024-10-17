import { Bell } from 'lucide-react';
import { NavigationBar } from './NavigationBar';
import { PageHeader } from './PageHeader';

const ChatPage = () => {
    const notifications = [
      { id: 1, title: 'Bill Payment Reminder', message: 'Your bill of $149 is due in 3 days', time: '2h ago' },
      { id: 2, title: 'Data Usage Alert', message: '80% of your data has been used', time: '5h ago' },
      { id: 3, title: 'New Offer Available', message: 'Double data for your current plan!', time: '1d ago' }
    ];
  
    return (
      <div className="bg-gradient-to-br from-pink-200 to-blue-200 min-h-screen p-6">
        <div className="max-w-md mx-auto">
          <PageHeader title="Notifications" />
          
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-start">
                  <Bell className="text-blue-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-700">{notification.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <span className="text-xs text-gray-500 mt-2 block">{notification.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          <NavigationBar activePage="chat" />
        </div>
      </div>
    );
  };
  