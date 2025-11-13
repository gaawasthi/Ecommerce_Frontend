import React from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';

const TopSellers = () => {
  // Sample top sellers data
  const topSellers = [
    { name: 'Seller A', sales: '$5,000' },
    { name: 'Seller B', sales: '$3,500' },
    { name: 'Seller C', sales: '$2,800' },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Top Sellers</h1>
      <ul className="bg-white p-4 rounded shadow space-y-2">
        {topSellers.map((seller) => (
          <li key={seller.name} className="flex justify-between border-b py-2">
            <span>{seller.name}</span>
            <span>{seller.sales}</span>
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
};

export default TopSellers;
