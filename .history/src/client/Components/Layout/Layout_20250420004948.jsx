import React from 'react';
import TopHeader from '../Header/TopHeader';
import BottomHeader from '../Header/BottomHeader';


const Layout = ({ children, onLogout }) => {
  return (
    <>
      <TopHeader onLogout={onLogout} />
      <BottomHeader />
      {children}
      <Footer />
    </>
  );
};

export default Layout;