import React, { useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import Table from '../../components/Table';



const Orders = () => {
  const [orders, setOrders] = useState([
    { 'Order ID': '1001', Customer: 'John Doe', Status: 'Delivered', Amount: '$120' },
    { 'Order ID': '1002', Customer: 'Jane Smith', Status: 'Pending', Amount: '$75' },
    { 'Order ID': '1003', Customer: 'Mike Ross', Status: 'Shipped', Amount: '$200' },
  ]);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <Table columns={['Order ID', 'Customer', 'Status', 'Amount']} data={orders} />
    </AdminLayout>
  );
};

export default Orders;
