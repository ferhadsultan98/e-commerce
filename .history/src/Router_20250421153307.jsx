import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./client/Components/Login/Login";
import Products from "./client/Pages/Products/Products";
import TechLogoSlider from "./client/Pages/TechSlider/TechSlider";
import Layout from "./client/Components/Layout/Layout";
import productData from "./client/Pages/Products/Products.json";
import ProductFeatures from "./client/Pages/ProductFeatures/ProductFeatures";
import Category from "./client/Pages/Category/Category";
import SubCategory from "./client/Pages/SubCategory/SubCategory";
import { useState } from "react";
import ShoppingCard from "./client/Pages/ShoppingCard/ShoppingCard";
import WishList from "./client/Pages/WishList/WishList";
import Exa from "./client/Pages/Exa/Exa";
import HeroShowcase from "./client/Pages/HeroShowCase/HeroShowCase";
import SearchPage from "./client/Pages/SearchPage/SearchPage";
import MainPage from "./client/Pages/MainPage/MainPage";

const PrivateRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

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
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout onLogout={handleLogout}>
                <MainPage/>
                <TechLogoSlider />
                <Products
                  onAddToWishlist={handleAddToWishlist}
                  onAddToCart={handleAddToCart}
                />
               
                <Exa />
                <HeroShowcase />
     
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/category/:categoryId"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout onLogout={handleLogout}>
                <Category
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
              <Layout onLogout={handleLogout}>
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
              <Layout onLogout={handleLogout}>
                <ProductFeatures />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout onLogout={handleLogout}>
                <WishList
                  wishlistItems={wishlistItems}
                  onRemoveFromWishlist={handleRemoveFromWishlist}
                />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/shoppingcard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout onLogout={handleLogout}>
                <ShoppingCard
                  cartItems={cartItems}
                  onRemoveFromCart={handleRemoveFromCart}
                />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout onLogout={handleLogout}>
                <SearchPage
                  onAddToWishlist={handleAddToWishlist}
                  onAddToCart={handleAddToCart}
                />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;