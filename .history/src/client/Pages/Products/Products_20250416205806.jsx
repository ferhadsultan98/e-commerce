// TechStore.jsx
import React, { useState } from 'react';
import '../../';
import { ShoppingCart, Heart, Info } from 'lucide-react';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'Bütün Məhsullar' },
    { id: 'laptops', name: 'Noutbuklar' },
    { id: 'phones', name: 'Telefonlar' },
    { id: 'tablets', name: 'Planşetlər' },
    { id: 'accessories', name: 'Aksesuarlar' },
    { id: 'smartwatches', name: 'Ağıllı Saatlar' }
  ];
  
  const products = [
    {
      id: 1,
      name: 'MacBook Pro M2',
      category: 'laptops',
      price: 2499,
      oldPrice: 2799,
      discount: 10,
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      name: 'iPhone 15 Pro',
      category: 'phones',
      price: 1199,
      oldPrice: 1399,
      discount: 15,
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      name: 'iPad Air',
      category: 'tablets',
      price: 599,
      oldPrice: 699,
      discount: 15,
      image: '/api/placeholder/300/200'
    },
    {
      id: 4,
      name: 'AirPods Pro',
      category: 'accessories',
      price: 199,
      oldPrice: 249,
      discount: 20,
      image: '/api/placeholder/300/200'
    },
    {
      id: 5,
      name: 'Apple Watch Series 9',
      category: 'smartwatches',
      price: 399,
      oldPrice: 449,
      discount: 12,
      image: '/api/placeholder/300/200'
    },
    {
      id: 6,
      name: 'Samsung Galaxy S24',
      category: 'phones',
      price: 899,
      oldPrice: 999,
      discount: 10,
      image: '/api/placeholder/300/200'
    }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="tech-store">
      <nav className="category-navbar">
        <div className="container">
          <div className="category-list">
            {categories.map(category => (
              <div 
                key={category.id} 
                className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </nav>
      
      <div className="container">
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <div className="discount-badge">-{product.discount}%</div>
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price-container">
          <span className="product-price">{product.price} ₼</span>
          <span className="product-old-price">{product.oldPrice} ₼</span>
        </div>
      </div>
      <div className="product-actions">
        <button className="action-button cart-button">
          <ShoppingCart size={20} />
          <span>Səbətə at</span>
        </button>
        <button className="action-button like-button">
          <Heart size={20} />
        </button>
        <button className="action-button features-button">
          <Info size={20} />
          <span>Xüsusiyyətlər</span>
        </button>
      </div>
    </div>
  );
};

export default Products;