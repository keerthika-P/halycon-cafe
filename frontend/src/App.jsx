import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import FoodDetail from './pages/FoodDetail';
import Cart from './pages/Cart';
import Liked from './pages/Liked';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';

export default function App() {
  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/food/:id" element={<FoodDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/liked" element={<Liked />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment/:orderId" element={<Payment />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
