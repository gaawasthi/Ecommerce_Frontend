import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import SellerLayout from '../../components/layouts/SellerLayout';

const SellerProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(user || JSON.parse(localStorage.getItem('user')) || {});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(form));
    setEditMode(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

  return (
    <SellerLayout>
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow p-6 mt-10">
        <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>

        {editMode ? (
          <>
            <input
              className="w-full border p-2 mb-3 rounded"
              name="name"
              value={form.name || ''}
              onChange={handleChange}
              placeholder="Full Name"
            />
            <input
              className="w-full border p-2 mb-3 rounded"
              name="email"
              value={form.email || ''}
              onChange={handleChange}
              placeholder="Email"
            />
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <p className="mb-2">
              <strong>Name:</strong> {form.firstName || 'N/A'}
            </p>
            <p className="mb-4">
              <strong>Email:</strong> {form.email || 'N/A'}
            </p>
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </SellerLayout>
  );
};

export default SellerProfile;
