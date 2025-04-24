// Exa.jsx
import React, { useState, useEffect } from 'react';
import './Exa.scss';
import productData from '../Products/'; // Assuming JSON is imported from a file

const Exa = () => {
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Randomly select 3 products from the JSON
  const getRandomProducts = (products, count) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map(product => ({
      id: product.id,
      name: product.name,
      category: product.category,
      subCategory: product.subCategory,
      price: product.price,
      oldPrice: product.oldPrice,
      discount: product.discount,
      image: product.image,
      specifications: Object.values(product.specifications),
      colors: ["#1C2526", "#A8A8A8", "#0047AB"], // Placeholder colors (JSON doesn't have colors)
      rating: (Math.random() * (5 - 4) + 4).toFixed(1) // Random rating between 4.0 and 5.0
    }));
  };

  const products = getRandomProducts(productData.products, 3);

  // Auto-rotate products
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setActiveProductIndex((prev) => (prev + 1) % products.length);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovering, products.length]);

  const currentProduct = products[activeProductIndex];

  return (
    <section className="productSection">
      <div className="productContainer">
        <div className="sectionHeader">
          <h2 className="sectionTitle">Explore Premium Tech</h2>
          <p className="sectionSubtitle">Cutting-edge devices for you</p>
        </div>

        <div
          className="productCard"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="productImageWrapper">
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="productImage"
            />
            <span className="productBadge">{currentProduct.discount}% Off</span>
            <button className="quickViewButton">View Details</button>
          </div>

          <div className="productDetails">
            <div className="productInfo">
              <div className="productMeta">
                <span className="productCategory">{currentProduct.subCategory}</span>
                <div className="ratingContainer">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`star ${i < Math.floor(currentProduct.rating) ? 'filled' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ratingScore">{currentProduct.rating}</span>
                </div>
              </div>

              <h3 className="productName">{currentProduct.name}</h3>

              <ul className="productSpecs">
                {currentProduct.specifications.map((spec, index) => (
                  <li key={index} className="specItem">{spec}</li>
                ))}
              </ul>

              <div className="colorSelector">
                <span className="colorLabel">Colors:</span>
                <div className="colorOptions">
                  {currentProduct.colors.map((color, index) => (
                    <button
                      key={index}
                      className="colorButton"
                      style={{ backgroundColor: color }}
                      aria-label={`Color option ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="priceSection">
                <span className="currentPrice">${currentProduct.price}</span>
                <span className="oldPrice">${currentProduct.oldPrice}</span>
              </div>

              <div className="actionButtons">
                <button className="addToCartButton">
                  <span className="buttonIcon">🛒</span> Add to Cart
                </button>
                <button className="wishlistButton">
                  <span className="buttonIcon">♡</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="productIndicators">
          {products.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === activeProductIndex ? 'active' : ''}`}
              onClick={() => setActiveProductIndex(index)}
              aria-label={`Show product ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Exa;