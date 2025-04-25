// AdminLayout.jsx
import React, { useState } from 'react';
import './AdminLayout.scss';
import { Sidebar } from 'lucide-react';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`content-area ${sidebarOpen ? '' : 'expanded'}`}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;