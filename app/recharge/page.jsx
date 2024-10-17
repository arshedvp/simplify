// app/recharge/page.js
export default function Recharge() {
    const plans = [
      { id: 1, price: 199, data: '1.5GB/day', validity: '28 days' },
      { id: 2, price: 499, data: '2GB/day', validity: '56 days' },
    ];
  
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h1 className="text-lg font-semibold mb-4">Recharge Plans</h1>
        <ul>
          {plans.map((plan) => (
            <li key={plan.id} className="flex justify-between py-2">
              <span>${plan.price}</span>
              <span>{plan.data}</span>
              <span>{plan.validity}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  