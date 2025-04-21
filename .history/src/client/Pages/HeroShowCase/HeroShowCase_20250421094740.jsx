import React, { useState } from 'react';
import '../../Styles/HeroShowCase.scss';
import { FaArrowRight, FaStar } from 'react-icons/fa';

const HeroShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('smartphones');

  const categories = [
    { id: 'smartphones', name: 'Smartphones', icon: '/icons/smartphone.png', featured: true },
    { id: 'laptops', name: 'Laptops', icon: '/icons/laptop.png', featured: true },
    { id: 'accessories', name: 'Accessories', icon: '/icons/accessories.png' },
    { id: 'wearables', name: 'Wearables', icon: '/icons/wearables.png' },
  ];

  const featuredProducts = {
    smartphones: [
      { name: 'Quantum X1', price: 999, image: '/products/quantum-x1.png', rating: 4.8 },
      { name: 'Neo Spark', price: 799, image: '/products/neo-spark.png', rating: 4.5 },
    ],
    laptops: [
      { name: 'ProBook Z', price: 1499, image: '/products/probook-z.png', rating: 4.7 },
      { name: 'UltraSlim 5', price: 1299, image: '/products/ultraslim-5.png', rating: 4.6 },
    ],
    accessories: [],
    wearables: [],
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <section className="heroShowcase">
      <div className="heroContainer">
        <div className="heroHeader">
          <h1>Discover the Future of Tech</h1>
          <p>Explore cutting-edge products designed to elevate your lifestyle.</p>
        </div>
        <div className="categoryTabs">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`categoryTab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <img src={category.icon} alt={category.name} className="categoryIcon" />
              {category.name}
              {category.featured && <span className="featuredBadge">Featured</span>}
            </button>
          ))}
        </div>
        <div className="productGrid">
          {featuredProducts[activeCategory].length > 0 ? (
            featuredProducts[activeCategory].map((product, index) => (
              <div key={index} className="productCard">
                <img src={product.image} alt={product.name} className="productImage" />
                <div className="productInfo">
                  <h3>{product.name}</h3>
                  <p className="productPrice">${product.price}</p>
                  <div className="productRating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.round(product.rating) ? 'star filled' : 'star'}
                      />
                    ))}
                    <span>({product.rating})</span>
                  </div>
                  <button className="shopNowButton">
                    Shop Now <FaArrowRight />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="noProducts">
              <p>No featured products available in this category.</p>
            </div>
          )}
        </div>
        <div className="exploreMore">
          <button className="exploreButton">Explore All Products</button>
        </div>
      </div>
    </section>
  );
};

export default HeroShowcase;