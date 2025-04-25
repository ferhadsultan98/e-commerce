import React from 'react';
import './AdminProducts.scss';

const AdminProducts = () => {
  const products = [
    { id: 1, name: 'iPhone 14', price: 1200, status: 'Aktiv' },
    { id: 2, name: 'Galaxy S23', price: 999, status: 'Passiv' },
    { id: 3, name: 'Xiaomi 13', price: 750, status: 'Aktiv' },
  ];

  return (
    <div className="admin-products">
      <div className="admin-header">
        <h2>Məhsullar</h2>
        <button className="add-product">+ Yeni Məhsul</button>
      </div>

      <div className="admin-controls">
        <input type="text" placeholder="Axtar..." />
        <select>
          <option>Hamısı</option>
          <option>Aktiv</option>
          <option>Passiv</option>
        </select>
      </div>

      <div className="admin-table">
        <div className="table-header">
          <div>Ad</div>
          <div>Qiymət</div>
          <div>Status</div>
          <div>Əməliyyat</div>
        </div>

        {products.map((product) => (
          <div className="table-row" key={product.id}>
            <div>{product.name}</div>
            <div>${product.price}</div>
            <div>{product.status}</div>
            <div>
              <button>Dəyiş</button>
              <button>Sil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
