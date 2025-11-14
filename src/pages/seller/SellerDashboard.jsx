import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card';

import {
  getSellerTotalRevenue,
  getlowStockProducts,
  getpendingOrders,
  getdeliverdOrders,
} from '../../features/seller/sellerSlice';
import SellerLayout from '../../components/layouts/SellerLayout';

const SellerDashboard = () => {
  const dispatch = useDispatch();

  const {
    total,
    lowStock,
    pendingOrders,
    deliverdOrders,
    isLoading,
    error,
  } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getSellerTotalRevenue());
    dispatch(getlowStockProducts());
    dispatch(getpendingOrders());
    dispatch(getdeliverdOrders());
  }, [dispatch]);



  const stats = [
    { title: 'Total Revenue', value:total.totalRevenue },
    { title: 'Pending Orders', value: pendingOrders?.length || 0 },
    { title: 'Delivered Orders', value: deliverdOrders?.length || 0 },
  ];

  if (isLoading) {
    return (
      <SellerLayout>
        <div className="text-center py-10 text-gray-500 text-lg">
          Loading seller dashboard...
        </div>
      </SellerLayout>
    );
  }SellerLayout
  if (error) {
    return (
      <SellerLayout>
        <div className="text-center py-10 text-red-500 text-lg">
          Something went wrong: {error}
        </div>
      </SellerLayout>
    );
  }

  return (
    <SellerLayout>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {stats.map((stat) => (
          <Card key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Low Stock Products</h2>
        <ul className="bg-white p-4 rounded shadow space-y-2">
          {lowStock?.length ? (
            lowStock.map((item) => (
              <li key={item._id || item.name}>
                {item.name} — Stock: {item.stock}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No low stock products</p>
          )}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Pending Orders</h2>
        <ul className="bg-white p-4 rounded shadow space-y-2">
          {pendingOrders?.length ? (
            pendingOrders.map((order) => (
              <li key={order._id}>
                Order #{order._id} — {order.items?.length} items
              </li>
            ))
          ) : (
            <p className="text-gray-500">No pending orders</p>
          )}
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2">Delivered Orders</h2>
        <ul className="bg-white p-4 rounded shadow space-y-2">
          {deliverdOrders?.length ? (
            deliverdOrders.map((order) => (
              <li key={order._id}>
                Order #{order._id} — {order.items?.length} items delivered
              </li>
            ))
          ) : (
            <p className="text-gray-500">No delivered orders</p>
          )}
        </ul>
      </div>

    </SellerLayout>
  );
};

export default SellerDashboard;
