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
 tuberc

System: It looks like your message was cut off. I assume you want me to continue with the updated `Sidebar.jsx` and provide the corresponding SCSS stylesheet in camelCase, without CSS variables, and fully responsive. Below, I'll complete the `Sidebar.jsx` with camelCase class names and then provide the SCSS stylesheet as requested.

### Updated Sidebar.jsx
The class names have been converted to camelCase (e.g., `sidebar-menu` to `sidebarMenu`, `menu-item` to `menuItem`). The functionality remains unchanged, and the structure is intact.

```jsx
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
      <div className="sidebarHeader">
        <h2>{isOpen ? 'TeyVonex' : 'TV'}</h2>
        <button className="toggleBtn" onClick={toggleSidebar}>
          <span className="materialIcons">
            {isOpen ? 'chevron_left' : 'chevron_right'}
          </span>
        </button>
      </div>

      <div className="sidebarMenu">
        <div
          className={`menuItem ${activeMenu === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleMenuClick('dashboard')}
        >
          <span className="materialIcons">dashboard</span>
          {isOpen && <span className="label">Dashboard</span>}
        </div>
        <div
          className={`menuItem ${activeMenu === 'products' ? 'active' : ''}`}
          onClick={() => handleMenuClick('products')}
        >
          <span className="materialIcons">inventory</span>
          {isOpen && <span className="label">Ürünler</span>}
        </div>
        <div
          className={`menuItem ${activeMenu === 'orders' ? 'active' : ''}`}
          onClick={() => handleMenuClick('orders')}
        >
          <span className="materialIcons">shopping_cart</span>
          {isOpen && <span className="label">Siparişler</span>}
        </div>
        <div
          className={`menuItem ${activeMenu === 'customers' ? 'active' : ''}`}
          onClick={() => handleMenuClick('customers')}
        >
          <span className="materialIcons">people</span>
          {isOpen && <span className="label">Müşteriler</span>}
        </div>
        <div
          className={`menuItem ${activeMenu === 'analytics' ? 'active' : ''}`}
          onClick={() => handleMenuClick('analytics')}
        >
          <span className="materialIcons">bar_chart</span>
          {isOpen && <span className="label">Analitik</span>}
        </div>
        <div
          className={`menuItem ${activeMenu === 'settings' ? 'active' : ''}`}
          onClick={() => handleMenuClick('settings')}
        >
          <span className="materialIcons">settings</span>
          {isOpen && <span className="label">Ayarlar</span>}
        </div>
        <div
          className={`menuItem ${activeMenu === 'preview' ? 'active' : ''}`}
          onClick={() => handleMenuClick('preview')}
        >
          <span className="materialIcons">visibility</span>
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
            <span className="materialIcons">logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;