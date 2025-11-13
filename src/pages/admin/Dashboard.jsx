import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../../components/layouts/AdminLayout';
import Card from '../../components/Card';
import {
  getTotalRevenue,
  lastWeek,
  topCustomers,
  topProducts,
  topSellers,
} from '../../features/adminAnalytics/AdminSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    revenue,
    weekData,
    sellersData,
    productsData,
    customersData,
    isLoading,
    error,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getTotalRevenue());
    dispatch(lastWeek());
    dispatch(topCustomers());
    dispatch(topProducts());
    dispatch(topSellers());

  }, [dispatch])

  const stats = [
    { title: 'Orders Last Week', value: weekData?.ordersLastWeek || 0 },
    { title: 'Customers Last Week', value: weekData?.customerLastWeek || 0 },
    { title: 'Total Revenue', value: `$${(revenue || 0).toLocaleString()}` },
  ];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="text-center py-10 text-gray-500 text-lg">Loading dashboard data...</div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center py-10 text-red-500 text-lg">
          Something went wrong: {error}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {stats.map((stat) => (
          <Card key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>

      {/* Top Sellers & Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-lg font-bold mb-2">Top Sellers</h2>
          <ul className="bg-white p-4 rounded shadow space-y-2">
            {sellersData?.length ? (
              sellersData.map((seller) => (
                <li key={seller._id || seller.name}>
                  {seller.firstName } {seller.lastName} — ${seller.totalRevenue} 
                </li>
              ))
            ) : (
              <p className="text-gray-500">No seller data</p>
            )}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-2">Top Products</h2>
          <ul className="bg-white p-4 rounded shadow space-y-2">
            {productsData?.length ? (
              productsData.map((prod) => (
                <li key={prod._id || prod.name}>
                  {prod.name} — Sold {prod.count} qty
                </li>
              ))
            ) : (
              <p className="text-gray-500">No product data</p>
            )}
          </ul>
        </div>
      </div>

      {/* Top Customers */}
      <div>
        <h2 className="text-lg font-bold mb-2">Top Customers</h2>
        <ul className="bg-white p-4 rounded shadow space-y-2">
          {customersData?.length ? (
            customersData.map((cust) => (
              <li key={cust._id || cust.name}>
                {cust.firstName} {cust.lastName} — {cust.count} orders
              </li>
            ))
          ) : (
            <p className="text-gray-500">No customer data</p>
          )}
        </ul>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
