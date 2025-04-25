import React from 'react';
import './Preview.scss';

const Preview = () => {
  return (
    <div className="preview-modal">
      <div className="preview-content">
        <div className="preview-header">
          <h2>Website Preview</h2>
        </div>
        <iframe
          src="https://example.com" // Replace with your website's URL
          title="Website Preview"
          className="preview-iframe"
        ></iframe>
      </div>
    </div>
  );
};

export default Preview;