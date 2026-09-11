import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/main-layout';

const Home = lazy(() => import('../pages/home'));
const Checkout = lazy(() => import('../pages/checkout'));
const Legal = lazy(() => import('../pages/legal'));
const Shop = lazy(() => import('../pages/shop'));
const Category = lazy(() => import('../pages/category'));
const Product = lazy(() => import('../pages/product'));
const Cart = lazy(() => import('../pages/cart'));
const About = lazy(() => import('../pages/about'));
const Login = lazy(() => import('../pages/login'));
const Register = lazy(() => import('../pages/register'));
const ForgotPassword = lazy(() => import('../pages/forgot-password'));
const ResetPassword = lazy(() => import('../pages/reset-password'));

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
