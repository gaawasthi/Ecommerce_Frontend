import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import DeleteModal from '../../components/DeleteModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProduct,
  getAllProducts,
} from '../../features/products/productSlice';

const Products = () => {
  const [deleteModal, setDeleteModal] = useState({ open: false, item: null });
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleDelete = (product) => {
    setDeleteModal({ open: true, item: product });
  };

  const confirmDelete = () => {
    if (deleteModal.item?._id) {
      dispatch(deleteProduct(deleteModal.item._id));
    }
    setDeleteModal({ open: false, item: null });
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Products</h1>

      {isLoading ? (
        <p className="text-lg text-gray-600 animate-pulse">Loading...</p>
      ) : (
        <div className="overflow-hidden rounded-2xl shadow-xl border border-gray-200 bg-white">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Category</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Description</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Price</th>
                <th className="p-4 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {products?.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="p-4 text-gray-800">{item.name}</td>
                  <td className="p-4 text-gray-600">{item.category}</td>
                  <td className="p-4 text-gray-600">{item.description}</td>
                  <td className="p-4 font-semibold text-gray-700">${item.price}</td>
                  <td className="p-4 text-center">
                    <button
                      className="bg-red-500 text-white px-4 py-1.5 rounded-lg shadow hover:bg-red-600 transition"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <DeleteModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, item: null })}
        onConfirm={confirmDelete}
        itemName={deleteModal.item?.name}
      />
    </AdminLayout>
  );
};

export default Products;