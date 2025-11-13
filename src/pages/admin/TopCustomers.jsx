import React from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';

const TopCustomers = () => {
  const topCustomers = [
    { name: 'John Doe', orders: 20 },
    { name: 'Jane Smith', orders: 15 },
    { name: 'Mike Ross', orders: 10 },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Top Customers</h1>
      <ul className="bg-white p-4 rounded shadow space-y-2">
        {topCustomers.map(cust => (
          <li key={cust.name} className="flex justify-between border-b py-2">
            <span>{cust.name}</span>
            <span>{cust.orders} Orders</span>
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
};

export default TopCustomers;
