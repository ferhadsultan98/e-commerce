// components/Sidebar.jsx
import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../server/server';
import './Sidebar.scss';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'products', icon: 'inventory', label: 'Ürünler' },
    { id: 'orders', icon: 'shopping_cart', label: 'Siparişler' },
    { id: 'customers', icon: 'people', label: 'Müşteriler' },
    { id: 'analytics', icon: 'bar_chart', label: 'Analitik' },
    { id: 'settings', icon: 'settings', label: 'Ayarlar' },
    { id: 'preview', icon: 'visibility', label: 'Site Önizleme' }
  ];

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    // Burada sayfa yönlendirmesi için navigasyon eklenebilir
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Çıkış sonrası login sayfasına yönlendirme eklenebilir
    } catch (error) {
      console.error("Çıkış yapılırken hata oluştu:", error);
    }
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2>{isOpen ? 'TechShop' : 'TS'}</h2>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <span className="material-icons">
            {isOpen ? 'chevron_left' : 'chevron_right'}
          </span>
        </button>
      </div>

      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
            onClick={() => handleMenuClick(item.id)}
          >
            <span className="material-icons">{item.icon}</span>
            {isOpen && <span className="label">{item.label}</span>}
          </div>
        ))}
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