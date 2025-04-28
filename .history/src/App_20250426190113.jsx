import React, { useState, useEffect } from "react";
import "./App.scss";
import Router from "./Router";
import ChatWidget from "./client/Components/Chat/ChatWidget";
import ScrollButton from "./client/Components/ScrollButton/ScrollButton";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("isAuthenticated") === "true"
  );
  const [isAdmin, setIsAdmin] = useState(
    sessionStorage.getItem("isAdmin") === "true"
  );

  useEffect(() => {
    sessionStorage.setItem("isAuthenticated", isAuthenticated.toString());
    sessionStorage.setItem("isAdmin", isAdmin.toString());
  }, [isAuthenticated, isAdmin]);

  const handleLogin = (admin = false) => {
    setIsAuthenticated(true);
    if (admin) {
      setIsAdmin(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("isAdmin");
  };

  return (
    <>
      <Router
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
      <ChatWidget />
      <ScrollButton />
      <ToastContaine />
    </>
  );
}

export default App;