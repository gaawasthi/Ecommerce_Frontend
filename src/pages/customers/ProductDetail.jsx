import React, { useEffect, useState } from 'react';
import {
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Star,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../../features/products/productSlice';
import { addToCart } from '../../features/cart/cartSlice';
import toast from 'not-a-toast';
import 'not-a-toast/style.css';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { product, isLoading, error } = useSelector((state) => state.product);
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    dispatch(getSingleProduct(id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch]);

  const handleQuantityChange = (action) => {
    if (action === 'increment' && quantity < product?.stock) {
      setQuantity(quantity + 1);
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuyNow = () => {
    const user = localStorage.getItem('user');

    if (!user) {
      alert('Please login first to proceed with purchase');
      return;
    }
    
 
    dispatch(addToCart({ 
      productId: id, 
      quantity: quantity 
    }));
  
 
  };

  const handleAddToCart = () => {
    const user = localStorage.getItem('user');

    if (!user) {
  toast({
    message: "Please login",
    showIcon: true,
    iconAnimation: "default",
    iconTimingFunction: "ease",
    iconBorderRadius: "50%",
    iconType: "warn",
});
      return;
    }

    dispatch(addToCart({ 
      productId: id, 
      quantity: quantity 
    }));
    
    
   toast({
    message: "Added to Cart.",
    showIcon: true,
    iconAnimation: "default",
    iconTimingFunction: "ease",
    iconBorderRadius: "50%",
    iconType: "success",
});
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">Error loading product</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm mb-8">
          <ol className="flex items-center space-x-2 text-gray-500">
            <li>Home</li>
            <li>/</li>
            <li>{product.category}</li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-lg aspect-square">
              <img
                src={product.images?.[selectedImage]?.url}
                alt={product.name}
                className=" h-full  object-cover"
              />
            </div>
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={image._id}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-blue-600 shadow-md'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-full transition-colors ${
                      isFavorite
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Heart
                      className={isFavorite ? 'fill-current' : ''}
                      size={20}
                    />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  (4.8 / 128 reviews)
                </span>
              </div>

              <p className="text-4xl font-bold text-gray-900">
                ₹{product.price}
              </p>
            </div>

            <div className="bg-gray-100 rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium text-gray-900">
                  {product.category}
                </span>
              </div>
              {product.brand && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Brand:</span>
                  <span className="font-medium text-gray-900">
                    {product.brand}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Color:</span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: product.color }}
                  ></div>
                  <span className="font-medium text-gray-900 capitalize">
                    {product.color}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Availability:</span>
                <span
                  className={`font-medium ${
                    product.stock > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : 'Out of stock'}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange('decrement')}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center text-lg font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange('increment')}
                  disabled={quantity >= product.stock}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="bg-gray-900 text-white py-4 px-8 rounded-xl font-semibold hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Buy Now
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Truck className="text-blue-600" size={20} />
                </div>
                <p className="text-xs text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="text-green-600" size={20} />
                </div>
                <p className="text-xs text-gray-600">2 Year Warranty</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <RotateCcw className="text-orange-600" size={20} />
                </div>
                <p className="text-xs text-gray-600">30 Day Returns</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Seller Information
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {product.seller?.firstName?.[0]}
                  {product.seller?.lastName?.[0]}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {product.seller?.firstName} {product.seller?.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {product.seller?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;