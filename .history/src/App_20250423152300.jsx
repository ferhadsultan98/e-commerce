import React, { useState, useEffect } from 'react';
import './App.scss';
import Router from './Router';
import ChatWidget from './client/Components/Chat/ChatWidget';
import ScrollButton from './client/Components/ScrollButton/ScrollButton';
import ScrollToTop from './client/Components/ScrollToTop/ScrollToTop';

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

  return (
    <>
        <ScrollToTop/>
    <Router
      isAuthenticated={isAuthenticated}
      handleLogin={handleLogin}
      handleLogout={handleLogout}
    />
    <ChatWidget/>
    <ScrollButton/>

    </>
  );
}

export default App;