import React, { useState, useEffect } from 'react';
import './App.css';
import Router from './Router';
import ChatWidget from './ChatWidget'; // Import the ChatWidget component

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
      <Router
        isAuthenticated={isAuthenticated}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
      
      {/* Chat Widget component - visible on all pages */}
      <ChatWidget />
    </>
  );
}

export default App;