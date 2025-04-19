import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './client/Components/Login/Login';
import Header from './client/Components/Header/TopHeader';
import Products from './client/Pages/Products/Products';
import TechLogoSlider from './client/Pages/TechSlider/TechSlider';
import BottomHeader from './client/Components/Header/BottomHeader';
import Footer from './client/Components/Footer/Footer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    sessionStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAuthenticated');
  };

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/tech"
          element={
            <PrivateRoute>
              <>
                <Header onLogout={handleLogout} />
                <BottomHeader/>
                <Products />
                <TechLogoSlider />
                <Footer/>
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/tech" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;