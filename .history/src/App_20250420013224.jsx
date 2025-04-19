import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './client/Components/Login/Login';
import Products from './client/Pages/Products/Products';
import TechLogoSlider from './client/Pages/TechSlider/TechSlider';
import Layout from './client/Components/Layout/Layout';

import productData from './client/Pages/Products/Products.json';
import SubCategoryPage from './client/Pages/SubCategory/SubCategory';

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
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        <Route
          path="/tech"
          element={
            <PrivateRoute>
              <Layout onLogout={handleLogout}>
                <Products />
                <TechLogoSlider />
              </Layout>
            </PrivateRoute>
          }
        />

  
        <Route
          path="/category/:categoryId/:subCategoryId"
          element={
            <PrivateRoute>
              <Layout onLogout={handleLogout}>
                <SubCategoryPage
                  categories={productData.categories}
                  subCategories={productData.subCategories}
                />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Default yönləndirmə */}
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
