import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../../server/server';
import { auth } from '../../../server/server';
import './Sidebar.scss';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const navigate = useNavigate();

  const handleMenuClick = (menuId, path) => {
    setActiveMenu(menuId);
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); 
    } catch (error) {
      console.error('Çıkış yapılırken hata oluştu:', error);
    }
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
        <div
          className={`menuItem ${activeMenu === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleMenuClick('dashboard', '/dashboard')}
        >
          <span className="material-icons">dashboard</span>
          {isOpen && <span className="label">Dashboard</span>}
        </div>
        <div
          className={`menuItem ${activeMenu === 'slider' ? 'active' : ''}`}
          onClick={() => handleMenuClick('slider', '/admin/slider')}
        >
          <span className="material-icons">inventory</span>
          {isOpen && <span className="label">slider</span>}
        </div>
        <div
          className={`menuItem ${activeMenu === 'orders' ? 'active' : ''}`}
          onClick={() => handleMenuClick('orders', '/orders')}
        >
          <span className="material-icons">shopping_cart</span>
          {isOpen && <span className="label">Siparişler</span>}
        </div>
        <div
          className={`menuItem ${activeMenu === 'customers' ? 'active' : ''}`}
          onClick={() => handleMenuClick('customers', '/customers')}
        >
          <span className="material-icons">people</span>
          {isOpen && <span className="label">Müşteriler</span>}
        </div>
        <div
          className={`menuItem ${activeMenu === 'analytics' ? 'active' : ''}`}
          onClick={() => handleMenuClick('analytics', '/analytics')}
        >
          <span className="material-icons">bar_chart</span>
          {isOpen && <span className="label">Analitik</span>}
        </div>
        <div
          className={`menuItem ${activeMenu === 'settings' ? 'active' : ''}`}
          onClick={() => handleMenuClick('settings', '/settings')}
        >
          <span className="material-icons">settings</span>
          {isOpen && <span className="label">Ayarlar</span>}
        </div>
        <div
          className={`menuItem ${activeMenu === 'preview' ? 'active' : ''}`}
          onClick={() => handleMenuClick('preview', '/admin/preview')}
        >
          <span className="material-icons">visibility</span>
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
            <span className="material-icons">logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;