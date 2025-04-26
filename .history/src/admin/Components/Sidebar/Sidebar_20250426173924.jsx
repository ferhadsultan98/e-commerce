// src/admin/Components/Sidebar/Sidebar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiChevronLeft,
  FiChevronRight,
  FiGrid,
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiEye,
  FiLogOut,
} from 'react-icons/fi';
import './Sidebar.scss';

const Sidebar = ({ isOpen, toggleSidebar, onLogout }) => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const navigate = useNavigate();

  const handleMenuClick = (menuId, path) => {
    setActiveMenu(menuId);
    navigate(path);
  };

  const handleLogout = () => {
    // Clear sessionStorage and call onLogout
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('isAdmin');
    onLogout();
    navigate('/login');
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebarHeader">
        <h2>{isOpen ? 'TeyVonex' : 'TV'}</h2>
        <button className="toggleBtn" onClick={toggleSidebar}>
          {isOpen ? <FiChevronLeft size={24} /> : <FiChevronRight size={24} />}
        </button>
      </div>

      <div className="sidebarMenu">
        <div
          className={`menuItem ${activeMenu === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleMenuClick('dashboard', '/dashboard')}
        >
          <FiGrid size={24} />
          {isOpen && <span className="label">Dashboard</span>}
        </div>
        <div
          className={`menuItem ${activeMenu === 'slider' ? 'active' : ''}`}
          onClick={() => handleMenuClick('slider', '/admin/slider')}
        >
          <FiPackage size={24} />
          {isOpen && <span className="label">Slider</span>}
        </div>
        <div
          className={`menuItem ${activeMenu === 'orders' ? 'active' : ''}`}
          onClick={() => handleMenuClick('orders', '/orders')}
        >
          <FiShoppingCart size={24} />
          {isOpen && <span className="label">Siparişler</span>}
        </div>
        <div
          className={`menuItem ${activeMenu === 'customers' ? 'active' : ''}`}
          onClick={() => handleMenuClick('customers', '/customers')}
        >
          <FiUsers size={24} />
          {isOpen && <span className="label">Müşteriler</span>}
        </div>
        <div
          className={`menuItem ${activeMenu === 'analytics' ? 'active' : ''}`}
          onClick={() => handleMenuClick('analytics', '/analytics')}
        >
          <FiBarChart2 size={24} />
          {isOpen && <span className="label">Analitik</span>}
        </div>
        <div
          className={`menuItem ${activeMenu === 'settings' ? 'active' : ''}`}
          onClick={() => handleMenuClick('settings', '/settings')}
        >
          <FiSettings size={24} />
          {isOpen && <span className="label">Ayarlar</span>}
        </div>
        <div
          className={`menuItem ${activeMenu === 'preview' ? 'active' : ''}`}
          onClick={() => handleMenuClick('preview', '/admin/preview')}
        >
          <FiEye size={24} />
          {isOpen && <span className="label">Site Önizleme</span>}
        </div>
      </div>

      <div className="sidebarFooter">
        <div className="userInfo">
          {isOpen && (
            <>
              <div className="userAvatar">A</div>
              <div className="userDetails">
                <p className="userName">Admin</p>
                <p className="userRole">Yönetici</p>
              </div>
            </>
          )}
          <button className="logoutBtn" onClick={handleLogout}>
            <FiLogOut size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;