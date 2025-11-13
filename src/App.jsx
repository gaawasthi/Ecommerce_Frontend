import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dasboard from './pages/admin/Dashboard';
import Orders from './pages/admin/Orders';
import Sellers from './pages/admin/Seller';
import Customers from './pages/admin/Customers';
import TopProducts from './pages/admin/TopProducts';
import TopCustomers from './pages/admin/TopCustomers';
import TopSellers from './pages/admin/TopSellers';
import AdminLogin from './pages/admin/AdminLogin';
import { Provider } from 'react-redux';
import store from './app/store';
import Profile from './pages/admin/Profile';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin" element={<Dasboard />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/sellers" element={<Sellers />} />
          <Route path="/admin/top-products" element={<TopProducts />} />
          <Route path="/admin/top-customers" element={<TopCustomers />} />
          <Route path="/admin/top-sellers" element={<TopSellers />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
