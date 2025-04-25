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
          <h2>Website Önizleme</h2>
        </div>
        {isLoading && <div className="loading-spinner">Yükleniyor...</div>}
        <iframe
          src="https://techstor.netlify.app"
          title="Website Önizleme"
          className={`preview-iframe ${isLoading ? 'hidden' : ''}`}
          onLoad={handleIframeLoad}
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-forms"
        ></iframe>
      </div>
    </div>
  );
};

export default AdminPreview;