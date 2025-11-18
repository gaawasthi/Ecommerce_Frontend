import React, { useEffect } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCart,
  updateCartItem,
  removeCartItem,
} from '../../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const cartItems = cart?.items || [];

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateCartItem({ productId, quantity: newQuantity }));
  };

  const handleRemove = (productId) => {
    dispatch(removeCartItem(productId));
  };
  const handleCheckout = () => {
    localStorage.setItem('cart', JSON.stringify(cart))
    navigate('/checkout');
  };
  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!cart?.items?.length)
    return <div className="text-center py-20">Your cart is empty</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-8 bg-white p-6 shadow rounded-xl">
        <h1 className="text-3xl font-bold border-b pb-4 mb-6">Shopping Cart</h1>

        {cart?.items?.map((item) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row items-center gap-6 border-b py-6"
          >
            <div className="w-28 h-28 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={item.product?.images?.[0]?.url}
                alt={item.product?.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-lg font-semibold">{item.product?.name}</h2>
              <p className="text-gray-500">{item.product?.category}</p>
              <p className="font-semibold">₹{item.price}</p>
            </div>

            <div className="flex items-center">
              <button
                onClick={() =>
                  handleQuantityChange(item.product._id, item.quantity - 1)
                }
                className="px-3 py-2 border rounded-l-lg hover:bg-gray-100"
              >
                <Minus size={18} />
              </button>
              <span className="border-y w-12 text-center py-2">
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  handleQuantityChange(item.product._id, item.quantity + 1)
                }
                className="px-3 py-2 border rounded-r-lg hover:bg-gray-100"
              >
                <Plus size={18} />
              </button>
            </div>

            <p className="text-lg font-bold">
              ₹{(item.price * item.quantity).toFixed(2)}
            </p>

            <button
              onClick={() => handleRemove(item.product._id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 size={22} />
            </button>
          </div>
        ))}
      </div>

      <div className="lg:col-span-4 bg-gray-50 p-6 shadow rounded-xl h-max">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{cart.itemsPrice || 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹0</span>
          </div>
        </div>

        <div className="flex justify-between border-t pt-4 mt-4">
          <span className="font-bold text-xl">Total</span>
          <span className="font-bold text-xl text-indigo-600">
            ₹{cart.totalPrice || 0}
          </span>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-6 hover:bg-indigo-700"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
