// src/Router.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import AdminLogin from './admin/Components/AdminLogin/AdminLogin';
import Products from './client/Pages/Products/Products';
import TechLogoSlider from './client/Pages/TechSlider/TechSlider';
import Layout from './client/Components/Layout/Layout';
import productData from './client/Pages/Products/Products.json';
import ProductFeatures from './client/Pages/ProductFeatures/ProductFeatures';
import Category from './client/Pages/Category/Category';
import SubCategory from './client/Pages/SubCategory/SubCategory';
import ShoppingCard from './client/Pages/ShoppingCard/ShoppingCard';
import WishList from './client/Pages/WishList/WishList';
import SearchPage from './client/Pages/SearchPage/SearchPage';
import MainPage from './client/Pages/MainPage/MainPage';
import Stores from './client/Pages/Stores/Stores';
import Deals from './client/Pages/Deals/Deals';
import ScrollToTop from './client/Components/ScrollToTop/ScrollToTop';
import AdminLayout from './admin/Components/AdminLayout/AdminLayout';
import AdminProducts from './admin/Pages/AdminProducts/AdminProducts';
import AdminPreview from './admin/Pages/AdminPreview/AdminPreview';
import AdminSlider from './admin/Pages/AdminSlider/AdminSlider';
import ErrorPage from './client/Pages/Error/ErrorPage';
import ChatWidget from './client/Components/Chat/ChatWidget';

const PrivateRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children, isAdmin }) => {
  return isAdmin ? children : <Navigate to="/login" />;
};

const Router = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('isAuthenticated') === 'true'
  );
  const [isAdmin, setIsAdmin] = useState(
    sessionStorage.getItem('isAdmin') === 'true'
  );
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const handleLogin = (isAdminLogin) => {
    setIsAuthenticated(true);
    if (isAdminLogin) {
      setIsAdmin(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('isAdmin');
    window.location.href = '/login'; // Force redirect to login
  };

  const handleAddToWishlist = (product) => {
    if (!wishlistItems.some((item) => item.id === product.id)) {
      setWishlistItems((prev) => [...prev, product]);
    }
  };

  const handleAddToCart = (product) => {
    if (!cartItems.some((item) => item.id === product.id)) {
      setCartItems((prev) => [...prev, product]);
    }
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={
            isAuthenticated && isAdmin ? (
              <Navigate to="/admin" />
            ) : (
              <AdminLogin onLogin={handleLogin} />
            )
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <AdminLayout onLogout={handleLogout}>
                <AdminProducts />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/preview"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <AdminLayout onLogout={handleLogout}>
                <AdminPreview />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/slider"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <AdminLayout onLogout={handleLogout}>
                <AdminSlider />
              </AdminLayout>
            </AdminRoute>
          }
        />

        {/* Client Routes */}
        <Route
          path="/"
          element={
            <Layout
              onLogout={handleLogout}
              wishlistItems={wishlistItems}
              cartItems={cartItems}
              onAddToWishlist={handleAddToWishlist}
              onAddToCart={handleAddToCart}
            >
              <MainPage />
              <TechLogoSlider />
              <Products
                onAddToWishlist={handleAddToWishlist}
                onAddToCart={handleAddToCart}
              />
              <ChatWidget/>
            </Layout>
          }
        />
        <Route
          path="/category/:categoryId"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout
                onLogout={handleLogout}
                wishlistItems={wishlistItems}
                cartItems={cartItems}
                onAddToWishlist={handleAddToWishlist}
                onAddToCart={handleAddToCart}
              >
                <Category
                  onAddToWishlist={handleAddToWishlist}
                  onAddToCart={handleAddToCart}
                />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/deals"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout
                onLogout={handleLogout}
                wishlistItems={wishlistItems}
                cartItems={cartItems}
                onAddToWishlist={handleAddToWishlist}
                onAddToCart={handleAddToCart}
              >
                <Deals
                  onAddToWishlist={handleAddToWishlist}
                  onAddToCart={handleAddToCart}
                />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/category/:categoryId/:subCategoryId"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout
                onLogout={handleLogout}
                wishlistItems={wishlistItems}
                cartItems={cartItems}
                onAddToWishlist={handleAddToWishlist}
                onAddToCart={handleAddToCart}
              >
                <SubCategory
                  categories={productData.categories}
                  subCategories={productData.subCategories}
                  onAddToWishlist={handleAddToWishlist}
                  onAddToCart={handleAddToCart}
                />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/product/:productId/features"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout
                onLogout={handleLogout}
                wishlistItems={wishlistItems}
                cartItems={cartItems}
                onAddToWishlist={handleAddToWishlist}
                onAddToCart={handleAddToCart}
              >
                <ProductFeatures />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout
                onLogout={handleLogout}
                wishlistItems={wishlistItems}
                cartItems={cartItems}
                onAddToWishlist={handleAddToWishlist}
                onAddToCart={handleAddToCart}
              >
                <WishList
                  wishlistItems={wishlistItems}
                  onRemoveFromWishlist={handleRemoveFromWishlist}
                  onAddToCart={handleAddToCart}
                  allProducts={productData.products || []}
                />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/shoppingcard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout
                onLogout={handleLogout}
                wishlistItems={wishlistItems}
                cartItems={cartItems}
                onAddToWishlist={handleAddToWishlist}
                onAddToCart={handleAddToCart}
              >
                <ShoppingCard
                  cartItems={cartItems}
                  onRemoveFromCart={handleRemoveFromCart}
                  allProducts={productData.products || []}
                />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout
                onLogout={handleLogout}
                wishlistItems={wishlistItems}
                cartItems={cartItems}
                onAddToWishlist={handleAddToWishlist}
                onAddToCart={handleAddToCart}
              >
                <SearchPage
                  onAddToWishlist={handleAddToWishlist}
                  onAddToCart={handleAddToCart}
                />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/stores"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout
                onLogout={handleLogout}
                wishlistItems={wishlistItems}
                cartItems={cartItems}
                onAddToWishlist={handleAddToWishlist}
                onAddToCart={handleAddToCart}
              >
                <Stores
                  onAddToWishlist={handleAddToWishlist}
                  onAddToCart={handleAddToCart}
                />
              </Layout>
            </PrivateRoute>
          }
        />
       
       

      </Routes>
    </BrowserRouter>
  );
};

export default Router;