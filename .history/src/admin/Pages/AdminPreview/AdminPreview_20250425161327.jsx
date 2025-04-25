import React, { useState } from 'react';
import './AdminPreview.scss';

const AdminPreview = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="preview-page">
      <div className="preview-container">
        <div className="preview-header">
          <h2>Website Preview</h2>
        </div>
        {isLoading && <div className="loading-spinner">Loading...</div>}
        <iframe
          src="https://techstor.netlify.app"
          title="Website Preview"
          className={`preview-iframe ${isLoading ? 'hidden' : ''}`}
          onLoad={handleIframeLoad}
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-popups"
        ></iframe>
      </div>
    </div>
  );
};

export default AdminPreview;