import React, { useEffect, useState } from 'react';
import {
  Menu,
  X,
  Search,
  LogIn,
  LogOut,
  ShoppingCart,
  Home,
  Heart,
  Package,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../features/cart/cartSlice';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

          <NavLink
            to="/"
            className="text-xl font-bold flex items-center gap-2 cursor-pointer"
          >
            <ShoppingCart className="text-blue-600" size={24} />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ShopHub
            </span>
          </NavLink>
        </div>

        {/* Desktop NavLinks */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`
            }
          >
            <Home size={18} />
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`
            }
          >
            <Package size={18} />
            Products
          </NavLink>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 mx-8 max-w-xl">
          <div className="relative w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Right Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <NavLink
            to="/cart"
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ShoppingCart size={22} className="text-gray-700" />
            {cart?.items?.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full font-medium">
                {cart?.items?.length}
              </span>
            )}
          </NavLink>

          {user ? (
            <div className="flex items-center gap-3">
              {/* User Avatar */}
              <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user.firstName[0]}
                </div>
                <span className="font-medium text-gray-700 text-sm">
                  {user.firstName}
                </span>
              </div>

              <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm font-medium">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors font-medium text-sm">
              <LogIn size={16} />
              Login
            </button>
          )}
        </div>

        {/* Mobile Cart */}
        <div className="flex md:hidden items-center gap-2">
          <NavLink
            to="/cart"
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ShoppingCart size={20} />
            {cart?.items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[16px] h-[16px] flex items-center justify-center rounded-full font-medium"></span>
            )}
          </NavLink>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-3">
          {/* Mobile Nav Links */}
          <div className="space-y-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium ${
                  isActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-blue-50'
                }`
              }
            >
              <Home size={18} />
              Home
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium ${
                  isActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-blue-50'
                }`
              }
            >
              <Package size={18} />
              Products
            </NavLink>

            <NavLink
              to="/cart"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              <ShoppingCart size={18} />
              <span>Cart</span>
              {cart?.items.length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {cart?.items.length}
                </span>
              )}
            </NavLink>
          </div>

          {/* Mobile Auth */}
          <div className="pt-3 border-t border-gray-200">
            {user ? (
              <button className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                <LogIn size={16} />
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
