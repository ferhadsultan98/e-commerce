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
import ComparePage from './client/Pages/ComparePage/ComparePage';


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
  const [compareItems, setCompareItems] = useState([]);

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
    window.location.href = '/login';
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

  const handleAddToCompare = (product) => {
    if (compareItems.length >= 4) {
      alert('You can compare up to 4 products at a time.');
      return;
    }
    if (!compareItems.some((item) => item.id === product.id)) {
      setCompareItems((prev) => [...prev, product]);
    }
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleRemoveFromCompare = (productId) => {
    setCompareItems((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
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
        <Route
          path="/"
          element={
            <Layout
              onLogout={handleLogout}
              wishlistItems={wishlistItems}
              cartItems={cartItems}
              compareItems={compareItems}
              onAddToWishlist={handleAddToWishlist}
              onAddToCart={handleAddToCart}
              onAddToCompare={handleAddToCompare}
            >
              <MainPage />
              <TechLogoSlider />
              <Products
                onAddToWishlist={handleAddToWishlist}
                onAddToCart={handleAddToCart}
                onAddToCompare={handleAddToCompare}
              />
              <ChatWidget />
            </Layout>
          }
        />
        <Route
          path="/category/:categoryId"
          element={
            <Layout
              onLogout={handleLogout}
              wishlistItems={wishlistItems}
              cartItems={cartItems}
              compareItems={compareItems}
              onAddToWishlist={handleAddToWishlist}
              onAddToCart={handleAddToCart}
              onAddToCompare={handleAddToCompare}
            >
              <Category
                onAddToWishlist={handleAddToWishlist}
                onAddToCart={handleAddToCart}
                onAddToCompare={handleAddToCompare}
              />
            </Layout>
          }
        />
        <Route
          path="/category/:categoryId/:subCategoryId"
          element={
            <Layout
              onLogout={handleLogout}
              wishlistItems={wishlistItems}
              cartItems={cartItems}
              compareItems={compareItems}
              onAddToWishlist={handleAddToWishlist}
              onAddToCart={handleAddToCart}
              onAddToCompare={handleAddToCompare}
            >
              <SubCategory
                categories={productData.categories}
                subCategories={productData.subCategories}
                onAddToWishlist={handleAddToWishlist}
                onAddToCart={handleAddToCart}
                onAddToCompare={handleAddToCompare}
              />
            </Layout>
          }
        />
        <Route
          path="/product/:productId/features"
          element={
            <Layout
              onLogout={handleLogout}
              wishlistItems={wishlistItems}
              cartItems={cartItems}
              compareItems={compareItems}
              onAddToWishlist={handleAddToWishlist}
              onAddToCart={handleAddToCart}
              onAddToCompare={handleAddToCompare}
            >
              <ProductFeatures />
              <RelatedProducts 
                items={productData.products}
                allProducts={productData.products}
                onAddToWishlist={handleAddToWishlist}
                onAddToCart={handleAddToCart}
                onAddToCompare={handleAddToCompare}
                hideCartButton={false}
                hideWishlistButton={false}
              />
            </Layout>
          }
        />
        <Route
          path="/wishlist"
          element={
            <Layout
              onLogout={handleLogout}
              wishlistItems={wishlistItems}
              cartItems={cartItems}
              compareItems={compareItems}
              onAddToWishlist={handleAddToWishlist}
              onAddToCart={handleAddToCart}
              onAddToCompare={handleAddToCompare}
            >
              <WishList
                wishlistItems={wishlistItems}
                onRemoveFromWishlist={handleRemoveFromWishlist}
                onAddToCart={handleAddToCart}
                allProducts={productData.products || []}
              />
            </Layout>
          }
        />
        <Route
          path="/shoppingcard"
          element={
            <Layout
              onLogout={handleLogout}
              wishlistItems={wishlistItems}
              cartItems={cartItems}
              compareItems={compareItems}
              onAddToWishlist={handleAddToWishlist}
              onAddToCart={handleAddToCart}
              onAddToCompare={handleAddToCompare}
            >
              <ShoppingCard
                cartItems={cartItems}
                onRemoveFromCart={handleRemoveFromCart}
                allProducts={productData.products || []}
              />
            </Layout>
          }
        />
        <Route
          path="/compare"
          element={
            <Layout
              onLogout={handleLogout}
              wishlistItems={wishlistItems}
              cartItems={cartItems}
              compareItems={compareItems}
              onAddToWishlist={handleAddToWishlist}
              onAddToCart={handleAddToCart}
              onAddToCompare={handleAddToCompare}
            >
              <ComparePage
                compareItems={compareItems}
                onRemoveFromCompare={handleRemoveFromCompare}
              />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout
              onLogout={handleLogout}
              wishlistItems={wishlistItems}
              cartItems={cartItems}
              compareItems={compareItems}
              onAddToWishlist={handleAddToWishlist}
              onAddToCart={handleAddToCart}
              onAddToCompare={handleAddToCompare}
            >
              <SearchPage
                onAddToWishlist={handleAddToWishlist}
                onAddToCart={handleAddToCart}
                onAddToCompare={handleAddToCompare}
              />
            </Layout>
          }
        />
        <Route
          path="/stores"
          element={
            <Layout
              onLogout={handleLogout}
              wishlistItems={wishlistItems}
              cartItems={cartItems}
              compareItems={compareItems}
              onAddToWishlist={handleAddToWishlist}
              onAddToCart={handleAddToCart}
              onAddToCompare={handleAddToCompare}
            >
              <Stores
                onAddToWishlist={handleAddToWishlist}
                onAddToCart={handleAddToCart}
                onAddToCompare={handleAddToCompare}
              />
            </Layout>
          }
        />
        <Route
          path="/deals"
          element={
            <Layout
              onLogout={handleLogout}
              wishlistItems={wishlistItems}
              cartItems={cartItems}
              compareItems={compareItems}
              onAddToWishlist={handleAddToWishlist}
              onAddToCart={handleAddToCart}
              onAddToCompare={handleAddToCompare}
            >
              <Deals
                onAddToWishlist={handleAddToWishlist}
                onAddToCart={handleAddToCart}
                onAddToCompare={handleAddToCompare}
              />
            </Layout>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
