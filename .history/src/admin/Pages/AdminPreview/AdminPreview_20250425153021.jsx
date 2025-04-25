import React, { useState } from 'react';
import './AdminPreview.scss';

const AdminPreview = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="preview-modal" role="dialog" aria-labelledby="preview-title">
      <div className="preview-content">
        <div className="preview-header">
          <h2 id="preview-title">Website Preview</h2>
        </div>
        {isLoading && <div className="loading-spinner">Loading...</div>}
        <iframe
          src="https://techstor.netlify.app"
          title="Website Preview"
          className="preview-iframe"
          onLoad={handleIframeLoad}
          style={{ display: isLoading ? 'none' : 'block' }}
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-popups"
        ></iframe>
      </div>
    </div>
  );
};

export default AdminPreview;