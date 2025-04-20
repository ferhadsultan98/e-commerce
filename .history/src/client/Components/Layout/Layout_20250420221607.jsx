import React from 'react';
import TopHeader from '../Header/TopHeader';
import BottomHeader from '../Header/BottomHeader';
import Footer from '../Footer/Footer';

const Layout = ({ children, onLogout, onAddToWishlist, onAddToCart }) => {
  return (
    <>
      <TopHeader onLogout={onLogout} />
      <BottomHeader onAddToWishlist={onAddToWishlist} onAddToCart={onAddToCart} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;