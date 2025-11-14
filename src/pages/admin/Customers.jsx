import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import DeleteModal from "../../components/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, deleteUser } from "../../features/adminAnalytics/AdminSlice";
;

const Customers = () => {
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    item: null,
  });

  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);

  const handleDelete = (user) => {
    setDeleteModal({ open: true, item: user });
  };

  const confirmDelete = () => {
    if (deleteModal.item?._id) {
      dispatch(deleteUser(deleteModal.item._id)).then(() => {
        dispatch(allUsers()); 
      });
    }
    setDeleteModal({ open: false, item: null });
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Customers</h1>

      {isLoading ? (
        <p className="text-lg text-gray-600 animate-pulse">Loading...</p>
      ) : (
        <div className="overflow-hidden rounded-2xl shadow-xl border border-gray-200 bg-white">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Phone</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Role</th>
                <th className="p-4 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {users?.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition duration-150">
                  <td className="p-4 text-gray-800">
                    {item.firstName} {item.lastName}
                  </td>
                  <td className="p-4 text-gray-600">{item.email}</td>
                  <td className="p-4 text-gray-600">{item.phone || "-"}</td>
                  <td className="p-4 text-gray-600 capitalize">{item.role}</td>
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
        itemName={`${deleteModal.item?.firstName} ${deleteModal.item?.lastName}`}
      />
    </AdminLayout>
  );
};

export default Customers;
