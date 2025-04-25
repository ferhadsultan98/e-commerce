import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../../../server/server';
import { auth } from '../../../server/server';
import './Sidebar.scss';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/login';
    } catch (error) {
      console.error('Çıkış yapılırken hata oluştu:', error);
    }
  };

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebarHeader">
        <h2>{isOpen ? 'TeyVonex' : 'TV'}</h2>
        <button className="toggleBtn" onClick={toggleSidebar}>
          <span className="material-icons">
            {isOpen ? 'chevron_left' : 'chevron_right'}
          </span>
        </button>
      </div>

      <div className="sidebarMenu">
        <Link
          to="/dashboard"
          className={`menuItem ${activeMenu === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleMenuClick('dashboard')}
        >
          <span className="material-icons">dashboard</span>
          {isOpen && <span className="label">Dashboard</span>}
        </Link>
        <Link
          to="/products"
          className={`menuItem ${activeMenu === 'products' ? 'active' : ''}`}
          onClick={() => handleMenuClick('products')}
        >
          <span className="material-icons">inventory</span>
          {isOpen && <span className="label">Ürünler</span>}
        </Link>
        <Link
          to="/orders"
          className={`menuItem ${activeMenu === 'orders' ? 'active' : ''}`}
          onClick={() => handleMenuClick('orders')}
        >
          <span className="material-icons">shopping_cart</span>
          {isOpen && <span className="label">Siparişler</span>}
        </Link>
        <Link
          to="/customers"
          className={`menuItem ${activeMenu === 'customers' ? 'active' : ''}`}
          onClick={() => handleMenuClick('customers')}
        >
          <span className="material-icons">people</span>
          {isOpen && <span className="label">Müşteriler</span>}
        </Link>
        <Link
          to="/analytics"
          className={`menuItem ${activeMenu === 'analytics' ? 'active' : ''}`}
          onClick={() => handleMenuClick('analytics')}
        >
          <span className="material-icons">bar_chart</span>
          {isOpen && <span className="label">Analitik</span>}
        </Link>
        <Link
          to="/settings"
          className={`menuItem ${activeMenu === 'settings' ? 'active' : ''}`}
          onClick={() => handleMenuClick('settings')}
        >
          <span className="material-icons">settings</span>
          {isOpen && <span className="label">Ayarlar</span>}
        </Link>
        <Link
          to="/preview"
          className={`menuItem ${activeMenu === 'preview' ? 'active' : ''}`}
          onClick={() => handleMenuClick('preview')}
        >
          <span className="material-icons">visibility</span>
          {isOpen && <span className="label">Site Önizleme</span>}
        </Link>
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
            <span className="material-icons">logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;