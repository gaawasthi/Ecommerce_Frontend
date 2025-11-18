import React, { Profiler } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  ShoppingCartIcon,
  UserIcon,
  TagIcon,
  StarIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { Apple, Globe, User } from 'lucide-react';

const Sidebar = () => {
  const links = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: <HomeIcon className="w-6 h-6" />,
    },
    {
      name: 'Profiles',
      path: '/admin/profile',
      icon: <User className="w-6 h-6" />,
    },
    {
      name: 'Products',
      path: '/admin/products',
      icon: <Globe className="w-6 h-6" />,
    },

    {
      name: 'Orders',
      path: '/admin/orders',
      icon: <ShoppingCartIcon className="w-6 h-6" />,
    },
    {
      name: 'Users',
      path: '/admin/customers',
      icon: <UserIcon className="w-6 h-6" />,
    },
  
    {
      name: 'Top Products',
      path: '/admin/top-products',
      icon: <StarIcon className="w-6 h-6" />,
    },
    {
      name: 'Top Customers',
      path: '/admin/top-customers',
      icon: <StarIcon className="w-6 h-6" />,
    },
    {
      name: 'Top Sellers',
      path: '/admin/top-sellers',
      icon: <ChartBarIcon className="w-6 h-6" />,
    },
  ];

  return (
    <div className="w-64 bg-white shadow-md p-4 h-screen">
      <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center p-2 rounded-md hover:bg-gray-200 ${
                isActive ? 'bg-gray-200 font-semibold' : ''
              }`
            }
          >
            {link.icon}
            <span className="ml-3">{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
