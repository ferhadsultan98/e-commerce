// src/admin/Components/AdminLayout/AdminLayout.jsx
import React, { useState } from 'react';
import './AdminLayout.scss';
import Sidebar from '../Sidebar/Sidebar';

const AdminLayout = ({ children, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        onLogout={onLogout}
      />
      <div className={`content-area ${sidebarOpen ? '' : 'expanded'}`}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;