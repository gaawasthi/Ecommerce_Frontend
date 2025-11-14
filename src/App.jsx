import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dasboard from './pages/admin/Dashboard';
import Orders from './pages/admin/Orders';
import Sellers from './pages/admin/Seller';
import Customers from './pages/admin/Customers';
import TopProducts from './pages/admin/TopProducts';
import TopCustomers from './pages/admin/TopCustomers';
import TopSellers from './pages/admin/TopSellers';
import { Provider } from 'react-redux';
import store from './app/store';
import Profile from './pages/admin/Profile';
import Login from './pages/Login';
import Products from './pages/admin/Products';
import SellerDashboard from './pages/seller/SellerDashboard';
import SellerProfile from './pages/seller/SellerProfile';
import SellerProducts from './pages/seller/SellerProducts';
import RegistrationForm from './pages/Register';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<RegistrationForm/>} />
           
          {/* admin routes */}
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Dasboard />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/sellers" element={<Sellers />} />
          <Route path="/admin/top-products" element={<TopProducts />} />
          <Route path="/admin/top-customers" element={<TopCustomers />} />
          <Route path="/admin/top-sellers" element={<TopSellers />} />


          {/* seller */}
          <Route path='/seller' element={<SellerDashboard/>}  />
             <Route path="/Seller/profile" element={< SellerProfile/>} />
             <Route path="/Seller/products" element={< SellerProducts/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
