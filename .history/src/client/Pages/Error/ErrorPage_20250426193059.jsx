// ErrorPage.jsx
import React from 'react';
import './errorPage.scss';

const ErrorPage = () => {
  const handleReturnHome = () => {
    window.location.href = '/';
  };
  
  return (
    <div className="errorContainer">
      <div className="errorContent">
        <div className="errorCode">404</div>
        <h1 className="errorTitle">Sayfa Bulunamadı</h1>
        <p className="errorMessage">
          Aradığınız sayfaya ulaşılamıyor. Lütfen ana sayfaya dönün.
        </p>
        <button 
          className="returnButton" 
          onClick={handleReturnHome}
        >
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;