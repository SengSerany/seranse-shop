import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/layout/Navigation';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import IndexProducts from './pages/products/IndexProducts';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <div className="container">
          <Routes>
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<IndexProducts />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
