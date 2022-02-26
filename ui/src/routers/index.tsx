
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from '../App';
import { LoginPage } from '../pages/login';

const getName = () => localStorage.getItem('xenName') || '';
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={getName() ? <Navigate replace to="/home" /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={getName() ? <Navigate replace to="/home" /> : <LoginPage />} />
        <Route path="/home" element={getName() ? <App /> : <Navigate replace to="/login" />} />
        LoginPage
      </Routes>
    </BrowserRouter>
  );
}
