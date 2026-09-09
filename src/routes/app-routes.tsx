import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/main-layout';

const Home = lazy(() => import('../pages/Home'));
const Checkout = lazy(() => import('../pages/Checkout'));
const Legal = lazy(() => import('../pages/Legal'));
const Shop = lazy(() => import('../pages/Shop'));
const Category = lazy(() => import('../pages/Category'));
const Product = lazy(() => import('../pages/Product'));
const Cart = lazy(() => import('../pages/Cart'));
const About = lazy(() => import('../pages/About'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/ResetPassword'));

export default function AppRoutes() {
  return <Suspense fallback={<div className="min-h-screen grid place-items-center text-xs uppercase tracking-[.18em]">Loading…</div>}>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/category/:slug" element={<Category />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Legal />} />
        <Route path="/privacy" element={<Legal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
    </Routes>
  </Suspense>;
}
