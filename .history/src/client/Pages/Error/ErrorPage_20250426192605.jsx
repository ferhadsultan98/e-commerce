// ErrorPage.jsx
import React, { useEffect, useState } from 'react';
import '../../Styles/ErrorPage.scss';

const ErrorPage = () => {
  const [countdown, setCountdown] = useState(10);
  
  useEffect(() => {
    const timer = countdown > 0 && setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);
    
    if (countdown === 0) {
      window.location.href = '/';
    }
    
    return () => clearInterval(timer);
  }, [countdown]);
  
  const handleReturnHome = () => {
    window.location.href = '/';
  };
  
  const handleRefresh = () => {
    window.location.reload();
  };
  
  return (
    <div className="errorPageContainer">
      <div className="errorPageContent">
        <div className="errorPageHeader">
          <div className="errorIcon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 7V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 17.01L12 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <h1 className="errorTitle">Oops! Something went wrong</h1>
        </div>
        
        <div className="errorPageBody">
          <p className="errorMessage">
            We're sorry, but we couldn't find the page you're looking for. Our team has been notified and is working to resolve the issue.
          </p>
          
          <div className="errorCode">
            <span>Error Code:</span> 404
          </div>
          
          <div className="errorDetails">
            <p>Unable to locate the requested resource</p>
            <p className="errorRedirect">
              You will be redirected to homepage in <span className="countdownTimer">{countdown}</span> seconds
            </p>
          </div>
          
          <div className="errorSuggestions">
            <h3>You might want to try:</h3>
            <ul>
              <li>Checking the URL for typos</li>
              <li>Going back to the previous page</li>
              <li>Exploring our featured products</li>
            </ul>
          </div>
          
          <div className="errorActions">
            <button 
              className="primaryButton" 
              onClick={handleReturnHome}
              aria-label="Return to homepage"
            >
              Return to Homepage
            </button>
            <button 
              className="secondaryButton" 
              onClick={handleRefresh}
              aria-label="Refresh page"
            >
              Refresh Page
            </button>
          </div>
        </div>
        
        <div className="errorPageFooter">
          <p>
            Need help? <a href="/contact" className="contactLink">Contact our support team</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;