import React from "react";
import { Link } from "react-router-dom";
import "./AdminLayout.scss";

const AdminLayout = ({ children }) => {
  return (
    <div className="adminLayout">
      <header className="adminHeader">
        <h1>Admin Panel</h1>
        <nav>
          <Link to="/admin/products">Products</Link>
          {/* Add other admin links as needed */}
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;