// app/call/page.js
export default function CallLogs() {
    const callLogs = [
      { id: 1, number: '+123456789', time: '10:00 AM', duration: '5 min' },
      { id: 2, number: '+987654321', time: '12:30 PM', duration: '10 min' },
    ];
  
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h1 className="text-lg font-semibold mb-4">Call Logs</h1>
        <ul>
          {callLogs.map((log) => (
            <li key={log.id} className="flex justify-between py-2">
              <span>{log.number}</span>
              <span>{log.time}</span>
              <span>{log.duration}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  