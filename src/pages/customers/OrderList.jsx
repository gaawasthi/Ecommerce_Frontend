import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelOrder, getUserOrders } from '../../features/orders/orderSlice';


export default function OrderHistory() {
  const dispatch = useDispatch();
  const { userOrders, isLoading, error } = useSelector((state) => state.order);
  
  const [activeTab, setActiveTab] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  console.log(userOrders);
  
  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  const tabs = [
    { id: 'all', label: 'All Order' },
    { id: 'summary', label: 'Summary' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      delivered: 'text-green-500',
      cancelled: 'text-red-500',
      pending: 'text-yellow-500',
      confirmed: 'text-blue-500',
      processing: 'text-blue-500',
      shipped: 'text-indigo-500',
      returned: 'text-orange-500',
    };
    return colors[status] || 'text-gray-500';
  };

  const getStatusDisplay = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getExpectedDelivery = (orderDate, status) => {
    if (status === 'delivered' || status === 'cancelled') {
      return formatDate(orderDate);
    }
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 5);
    return formatDate(date);
  };
   
  const handleCancelOrder = async (orderId) => {
    console.log(orderId);
    
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await dispatch(cancelOrder(orderId)).unwrap();
        dispatch(getUserOrders());
        alert('Order cancelled successfully');
      } catch (error) {
        alert(error || 'Failed to cancel order');
      }
    }
  };

  const filteredOrders = userOrders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'completed') return order.orderStatus === 'delivered';
    if (activeTab === 'cancelled') return order.orderStatus === 'cancelled';
    if (activeTab === 'summary') return ['pending', 'confirmed', 'processing', 'shipped'].includes(order.orderStatus);
    return true;
  });

  if (isLoading) {
    return (
      <section className="py-24 relative">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-xl text-gray-500">Loading orders...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 relative">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-xl text-red-500 mb-4">{error}</p>
              <button
                onClick={() => dispatch(getUserOrders())}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="font-manrope font-extrabold text-3xl leading-10 text-black mb-9">
          Order History
        </h2>

        <div className="flex sm:flex-col lg:flex-row sm:items-center justify-between">
          <ul className="flex max-sm:flex-col sm:items-center gap-x-14 gap-y-3">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-medium text-lg leading-8 cursor-pointer transition-all duration-500 hover:text-indigo-600 ${
                  activeTab === tab.id ? 'text-indigo-600' : 'text-black'
                }`}
              >
                {tab.label}
              </li>
            ))}
          </ul>

          <div className="flex max-sm:flex-col items-center justify-end gap-2 max-lg:mt-5">
            <div className="flex rounded-full py-3 px-4 border border-gray-300 relative">
              <svg className="relative" width="18" height="20" viewBox="0 0 18 20" fill="none">
                <path
                  d="M1.5 7.75H16.5M11.9213 11.875H11.928M11.9212 14.125H11.9279M9.14676 11.875H9.1535M9.14676 14.125H9.1535M6.37088 11.875H6.37762M6.37088 14.125H6.37762M5.25 4.75V1.75M12.75 4.75V1.75M7.5 18.25H10.5C13.3284 18.25 14.7426 18.25 15.6213 17.3713C16.5 16.4926 16.5 15.0784 16.5 12.25V9.25C16.5 6.42157 16.5 5.00736 15.6213 4.12868C14.7426 3.25 13.3284 3.25 10.5 3.25H7.5C4.67157 3.25 3.25736 3.25 2.37868 4.12868C1.5 5.00736 1.5 6.42157 1.5 9.25V12.25C1.5 15.0784 1.5 16.4926 2.37868 17.3713C3.25736 18.25 4.67157 18.25 7.5 18.25Z"
                  stroke="#111827"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                value={dateRange.from}
                onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                className="font-semibold px-2 text-sm text-gray-900 outline-0 appearance-none flex flex-row-reverse cursor-pointer w-28 placeholder-gray-900"
                placeholder="11-01-2023"
              />
            </div>
            <p className="font-medium text-lg leading-8 text-black">To</p>
            <div className="flex rounded-full py-3 px-4 border border-gray-300 relative">
              <svg className="relative" width="18" height="20" viewBox="0 0 18 20" fill="none">
                <path
                  d="M1.5 7.75H16.5M11.9213 11.875H11.928M11.9212 14.125H11.9279M9.14676 11.875H9.1535M9.14676 14.125H9.1535M6.37088 11.875H6.37762M6.37088 14.125H6.37762M5.25 4.75V1.75M12.75 4.75V1.75M7.5 18.25H10.5C13.3284 18.25 14.7426 18.25 15.6213 17.3713C16.5 16.4926 16.5 15.0784 16.5 12.25V9.25C16.5 6.42157 16.5 5.00736 15.6213 4.12868C14.7426 3.25 13.3284 3.25 10.5 3.25H7.5C4.67157 3.25 3.25736 3.25 2.37868 4.12868C1.5 5.00736 1.5 6.42157 1.5 9.25V12.25C1.5 15.0784 1.5 16.4926 2.37868 17.3713C3.25736 18.25 4.67157 18.25 7.5 18.25Z"
                  stroke="#111827"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                value={dateRange.to}
                onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                className="font-semibold px-2 text-sm text-gray-900 outline-0 appearance-none flex flex-row-reverse cursor-pointer w-28 placeholder-gray-900"
                placeholder="11-01-2023"
              />
            </div>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="mt-7 border border-gray-300 p-12 text-center">
            <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className="text-xl text-gray-500">No orders found</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order._id} className="mt-7 border border-gray-300 pt-9">
              <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
                <div className="data">
                  <p className="font-medium text-lg leading-8 text-black whitespace-nowrap">
                    Order : {order.ordernumber}
                  </p>
                  <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">
                    Order Payment : {formatDate(order.createdAt)}
                  </p>
                  <p className="font-normal text-base leading-7 text-gray-500 mt-2">
                    Payment Method: {order.paymentMethod.toUpperCase()}
                  </p>
                </div>
                <div className="flex items-center gap-3 max-md:mt-5">
                  <button className="rounded-full px-7 py-3 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400">
                    Show Invoice
                  </button>
                  {order.orderStatus !== 'cancelled' && order.orderStatus !== 'delivered' && (
                    <button className="rounded-full px-7 py-3 bg-indigo-600 shadow-sm shadow-transparent text-white font-semibold text-sm transition-all duration-500 hover:shadow-indigo-400 hover:bg-indigo-700">
                      Track Order
                    </button>
                  )}
                </div>
              </div>

              <svg className="my-9 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2" fill="none">
                <path d="M0 1H1216" stroke="#D1D5DB" />
              </svg>

              {order.items.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
                    <div className="grid grid-cols-4 w-full">
                      <div className="col-span-4 sm:col-span-1">
                        <img 
                          src={item.product.images[0].url || 'https://via.placeholder.com/150'} 
                          alt={item.product.name} 
                          className="max-sm:mx-auto object-cover rounded-lg w-full h-40"
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                        <h6 className="font-manrope font-semibold text-2xl leading-9 text-black mb-3">
                          {item.product.name}
                        </h6>
                        {item.product.brand && (
                          <p className="font-normal text-lg leading-8 text-gray-500 mb-8">
                            By: {item.product.brand}
                          </p>
                        )}
                        <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                          <span className="font-normal text-lg leading-8 text-gray-500">
                            Qty: {item.quantity}
                          </span>
                          <p className="font-semibold text-xl leading-8 text-black">
                            Price ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-around w-full sm:pl-28 lg:pl-0">
                      <div className="flex flex-col justify-center items-start max-sm:items-center">
                        <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                          Status
                        </p>
                        <p className={`font-semibold text-lg leading-8 ${getStatusColor(order.orderStatus)} text-left whitespace-nowrap`}>
                          {getStatusDisplay(order.orderStatus)}
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-start max-sm:items-center">
                        <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                          {order.orderStatus === 'delivered' ? 'Delivered On' : 'Expected Delivery'}
                        </p>
                        <p className="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">
                          {getExpectedDelivery(order.createdAt, order.orderStatus)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {index < order.items.length - 1 && (
                    <svg className="my-9 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2" fill="none">
                      <path d="M0 1H1216" stroke="#D1D5DB" />
                    </svg>
                  )}
                </React.Fragment>
              ))}

              <svg className="mt-9 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2" fill="none">
                <path d="M0 1H1216" stroke="#D1D5DB" />
              </svg>

              <div className="px-3 md:px-11 flex items-center justify-between max-sm:flex-col-reverse">
                <div className="flex max-sm:flex-col-reverse items-center">
                  {order.orderStatus !== 'cancelled' && order.orderStatus !== 'delivered' && (
                    <button 
                      onClick={() => handleCancelOrder(order._id)}
                      className="flex items-center gap-3 py-10 pr-8 sm:border-r border-gray-300 font-normal text-xl leading-8 text-gray-500 group transition-all duration-500 hover:text-indigo-600"
                    >
                      <svg width="40" height="41" viewBox="0 0 40 41" fill="none">
                        <path
                          className="stroke-gray-600 transition-all duration-500 group-hover:stroke-indigo-600"
                          d="M14.0261 14.7259L25.5755 26.2753M14.0261 26.2753L25.5755 14.7259"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Cancel Order
                    </button>
                  )}
                  <p className="font-normal text-xl leading-8 text-gray-500 sm:pl-8">
                    {order.orderStatus === 'delivered' ? 'Order Delivered Successfully' : 
                     order.orderStatus === 'cancelled' ? 'Order Cancelled' : 
                     'Payment Successful'}
                  </p>
                </div>
                <div className="font-medium text-lg leading-8 text-black max-sm:py-4">
                  <div className="text-gray-500 mb-2 text-sm">
                    Items: ${order.itemsPrice.toFixed(2)} | 
                    Shipping: ${order.shippingPrice.toFixed(2)} | 
                    Tax: ${order.taxPrice.toFixed(2)}
                    {order.discount > 0 && ` | Discount: -$${order.discount.toFixed(2)}`}
                  </div>
                  <p className="text-xl">
                    <span className="text-gray-500">Total Price: </span>
                    <span className="font-bold">${order.totalPrice.toFixed(2)}</span>
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}