// Layout.jsx
import React from 'react';
import TopHeader from '../Header/TopHeader';
import BottomHeader from '../Header/BottomHeader';
import Footer from '../Footer/Footer';

const Layout = ({ children, onLogout, wishlistItems, cartItems, onAddToWishlist, onAddToCart }) => {
  return (
    <>
      <TopHeader onLogout={onLogout} />
      <BottomHeader 
        wishlistItems={wishlistItems} 
        cartItems={cartItems}
        onAddToWishlist={onAddToWishlist} 
        onAddToCart={onAddToCart} 
      />
      {children}
      <Footer />
    </>
  );
};

export default Layout;