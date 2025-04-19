import React from 'react';


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