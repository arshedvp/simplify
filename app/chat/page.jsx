// app/chat/page.js
export default function Chat() {
    const notifications = [
      { id: 1, message: 'Your plan expires in 5 days.' },
      { id: 2, message: 'New recharge offer: 10% cashback!' },
    ];
  
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h1 className="text-lg font-semibold mb-4">Chat Notifications</h1>
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className="py-2">
              {notification.message}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  