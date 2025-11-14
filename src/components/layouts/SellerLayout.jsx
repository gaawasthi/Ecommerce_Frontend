import React from 'react';
import Sidebar from '../Sidebar';
import SellerSidebar from '../SellerSidebar';

const SellerLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SellerSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default SellerLayout;
