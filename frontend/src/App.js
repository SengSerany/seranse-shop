import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import InfosCharge from './components/layout/InfosCharge';
import Navigation from './components/layout/Navigation';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Profile from './pages/auth/Profile';
import About from './pages/about/About';
import AuthToasts from './components/auth/AuthToasts';
import ProductsIndex from './pages/products/ProductsIndex';
import ProductNew from './pages/products/ProductNew';
import ProductShow from './pages/products/ProductShow';
import ProductEdit from './pages/products/ProductEdit';
import ProductToasts from './components/product/ProductToast';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <InfosCharge />
        <Navigation />
        <AuthToasts />
        <ProductToasts />
        <div className="container">
          <Routes>
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/products/new" element={<ProductNew />} />
            <Route exact path="/products/:id/edit" element={<ProductEdit />} />
            <Route exact path="/products/:id" element={<ProductShow />} />
            <Route exact path="/" element={<ProductsIndex />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;