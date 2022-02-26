
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/login';
import { HomePage } from '../pages/home';
import { ProductPage } from '../pages/products';
import { CartPage } from '../pages/carts';
import { ProfilePage } from '../pages/my-profile';

export default function Router() {
  const getName = () => localStorage.getItem('xenName') || '';

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={getName() ? <Navigate replace to="/home" /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={getName() ? <Navigate replace to="/home" /> : <LoginPage />} />
        <Route path="/home" element={getName() ? <HomePage /> : <Navigate replace to="/login" />} />
        <Route path="/products" element={getName() ? <ProductPage /> : <Navigate replace to="/login" />} />
        <Route path="/cart" element={getName() ? <CartPage /> : <Navigate replace to="/login" />} />
        <Route path="/my-profile" element={getName() ? <ProfilePage /> : <Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
