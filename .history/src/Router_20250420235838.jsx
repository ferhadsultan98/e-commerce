import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./client/Components/Login/Login";
import Products from "./client/Pages/Products/Products";
import TechLogoSlider from "./client/Pages/TechSlider/TechSlider";
import Layout from "./client/Components/Layout/Layout";
import ProductFeatures from "./client/Pages/ProductFeatures/ProductFeatures";
import Category from "./client/Pages/Category/Category";
import SubCategory from "./client/Pages/SubCategory/SubCategory";
import ShoppingCard from "./client/Pages/ShoppingCard/ShoppingCard";
import WishList from "./client/Pages/Wishlist/WishList";

const Router = ({ isAuthenticated, handleLogin, handleLogout }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

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
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        
        {/* Route that requires authentication */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout}>
                <Products
                  onAddToWishlist={handleAddToWishlist}
                  onAddToCart={handleAddToCart}
                />
                <TechLogoSlider />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        
        <Route
          path="/category/:categoryId"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout}>
                <Category
                  onAddToWishlist={handleAddToWishlist}
                  onAddToCart={handleAddToCart}
                />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/category/:categoryId/:subCategoryId"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout}>
                <SubCategory
                  wishlistItems={wishlistItems}
                  onAddToWishlist={handleAddToWishlist}
                  cartItems={cartItems}
                  onAddToCart={handleAddToCart}
                />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/product/:productId/features"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout}>
                <ProductFeatures />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/wishlist"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout}>
                <WishList
                  wishlistItems={wishlistItems}
                  onRemoveFromWishlist={handleRemoveFromWishlist}
                />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/shoppingcard"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout}>
                <ShoppingCard
                  cartItems={cartItems}
                  onRemoveFromCart={handleRemoveFromCart}
                />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
