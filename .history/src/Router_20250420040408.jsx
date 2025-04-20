// client/Router.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./client/Components/Login/Login";
import Products from "./client/Pages/Products/Products";
import TechLogoSlider from "./client/Pages/TechSlider/TechSlider";
import Layout from "./client/Components/Layout/Layout";
import productData from "./client/Pages/Products/Products.json";
import CategoryPage from "./client/Pages/Category/CategoryPage";
import SubCategoryPage from "./client/Pages/SubCategory/SubCategoryPage";
import ProductFeatures from "./client/Pages/ProductFeatures/ProductFeatures";


const PrivateRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const Router = ({ isAuthenticated, handleLogin, handleLogout }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/tech"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout onLogout={handleLogout}>
                <Products />
                <TechLogoSlider />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/category/:categoryId"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout onLogout={handleLogout}>
                <CategoryPage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/category/:categoryId/:subCategoryId"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout onLogout={handleLogout}>
                <SubCategoryPage
                  categories={productData.categories}
                  subCategories={productData.subCategories}
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
                <ProductFeatures/>
              </Layout>
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
};

export default Router;