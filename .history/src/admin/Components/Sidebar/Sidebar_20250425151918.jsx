// components/Sidebar.jsx
import React, { useState } from 'react';
import { signOut } from '../../../server/server';
import { auth } from '../../../server/server';
import './Sidebar.scss';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);

  };

  const handleLogout = async () => {
    try {
      await signOut(auth);

    } catch (error) {
      console.error("Çıkış yapılırken hata oluştu:", error);
    }
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2>{isOpen ? 'Teynovex' : 'TV'}</h2>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <span className="material-icons">
            {isOpen ? 'chevron_left' : 'chevron_right'}
          </span>
        </button>
      </div>

      <div className="sidebar-menu">
        <div
          className={`menu-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleMenuClick('dashboard')}
        >
          <span className="material-icons">dashboard</span>
          {isOpen && <span className="label">Dashboard</span>}
        </div>
        <div
          className={`menu-item ${activeMenu === 'products' ? 'active' : ''}`}
          onClick={() => handleMenuClick('products')}
        >
          <span className="material-icons">inventory</span>
          {isOpen && <span className="label">Ürünler</span>}
        </div>
        <div
          className={`menu-item ${activeMenu === 'orders' ? 'active' : ''}`}
          onClick={() => handleMenuClick('orders')}
        >
          <span className="material-icons">shopping_cart</span>
          {isOpen && <span className="label">Siparişler</span>}
        </div>
        <div
          className={`menu-item ${activeMenu === 'customers' ? 'active' : ''}`}
          onClick={() => handleMenuClick('customers')}
        >
          <span className="material-icons">people</span>
          {isOpen && <span className="label">Müşteriler</span>}
        </div>
        <div
          className={`menu-item ${activeMenu === 'analytics' ? 'active' : ''}`}
          onClick={() => handleMenuClick('analytics')}
        >
          <span className="material-icons">bar_chart</span>
          {isOpen && <span className="label">Analitik</span>}
        </div>
        <div
          className={`menu-item ${activeMenu === 'settings' ? 'active' : ''}`}
          onClick={() => handleMenuClick('settings')}
        >
          <span className="material-icons">settings</span>
          {isOpen && <span className="label">Ayarlar</span>}
        </div>
        <div
          className={`menu-item ${activeMenu === 'preview' ? 'active' : ''}`}
          onClick={() => handleMenuClick('preview')}
        >
          <span className="material-icons">visibility</span>
          {isOpen && <span className="label">Site Önizleme</span>}
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="user-info">
          {isOpen && (
            <>
              <div className="user-avatar">A</div>
              <div className="user-details">
                <p className="user-name">Admin</p>
                <p className="user-role">Yönetici</p>
              </div>
            </>
          )}
          <button className="logout-btn" onClick={handleLogout}>
            <span className="material-icons">logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
