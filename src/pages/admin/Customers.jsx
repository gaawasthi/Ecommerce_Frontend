import React, { useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import DeleteModal from '../../components/DeleteModal';
import Table from '../../components/Table';


const Customers = () => {
  
  const [customers, setCustomers] = useState([
    { Name: 'John Doe', Email: 'john@example.com' },
    { Name: 'Jane Smith', Email: 'jane@example.com' },
  ]);
  const [deleteModal, setDeleteModal] = useState({ open: false, item: null });

  const handleDelete = (customer) => {
    setDeleteModal({ open: true, item: customer });
  };

  const confirmDelete = () => {
    setCustomers(customers.filter(c => c !== deleteModal.item));
    setDeleteModal({ open: false, item: null });
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <Table
        columns={['Name', 'Email']}
        data={customers}
        actions={[{ label: 'Delete', onClick: handleDelete }]}
      />
      <DeleteModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, item: null })}
        onConfirm={confirmDelete}
        itemName={deleteModal.item?.Name}
      />
    </AdminLayout>
  );
};

export default Customers;
