import React from 'react';
import './Preview.scss';

const AdminPreview = () => {
  return (
    <div className="preview-modal">
      <div className="preview-content">
        <div className="preview-header">
          <h2>Website Preview</h2>
        </div>
        <iframe
          src="https://techstor.netlify.app"
          title="Website Preview"
          className="preview-iframe"
        ></iframe>
      </div>
    </div>
  );
};

export default AdminPreview;