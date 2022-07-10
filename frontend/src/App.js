import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navigation from './components/layout/Navigation';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import IndexProducts from './pages/products/IndexProducts';
import Profile from './pages/auth/Profile';
import AuthToasts from './components/auth/AuthToasts';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <AuthToasts />
        <div className="container">
          <Routes>
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<IndexProducts />} />
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
