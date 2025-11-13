import React from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';

const TopProducts = () => {
  const topProducts = [
    { name: 'Product X', sold: 120 },
    { name: 'Product Y', sold: 80 },
    { name: 'Product Z', sold: 60 },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Top Products</h1>
      <ul className="bg-white p-4 rounded shadow space-y-2">
        {topProducts.map(prod => (
          <li key={prod.name} className="flex justify-between border-b py-2">
            <span>{prod.name}</span>
            <span>{prod.sold} Sold</span>
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
};

export default TopProducts;
