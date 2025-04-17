// Products.jsx
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
    <div className="techStore">
      <nav className="categoryNavbar">
        <div className="navWrapper">
          <div className="categoryList">
            {categories.map(category => (
              <div 
                key={category.id} 
                className={`categoryItem ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </nav>
      
      <div className="mainWrapper">
        <div className="productsGrid">
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
    <div className="productCard">
      <div className="productImageContainer">
        <div className="discountBadge">-{product.discount}%</div>
        <img src={product.image} alt={product.name} className="productImage" />
      </div>
      <div className="productInfo">
        <h3 className="productName">{product.name}</h3>
        <div className="productPriceContainer">
          <span className="productPrice">{product.price} ₼</span>
          <span className="productOldPrice">{product.oldPrice} ₼</span>
        </div>
      </div>
      <div className="productActions">
        <button className="actionButton cartButton">
          <ShoppingCart size={20} />
          <span>Səbətə at</span>
        </button>
        <button className="actionButton likeButton">
          <Heart size={20} />
        </button>
        <button className="actionButton featuresButton">
          <Info size={20} />
          <span>Xüsusiyyətlər</span>
        </button>
      </div>
    </div>
  );
};

export default Products;