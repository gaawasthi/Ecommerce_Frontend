import React from 'react';
import Sidebar from '../Sidebar';
import ProductSIdebar from '../ProductSIdebar';

const ProductLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <ProductSIdebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default ProductLayout;
