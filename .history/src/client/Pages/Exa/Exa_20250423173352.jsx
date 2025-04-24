// Exa.jsx
import React, { useState, useEffect } from 'react';
import '../../Styles/Exa.scss';
import productData from '../Products/Products.json';

const Exa = () => {
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

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
      colors: ["#1C2526", "#A8A8A8", "#0047AB"],
      rating: (Math.random() * (5 - 4) + 4).toFixed(1)
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
    <section className="exaSection">
      <div className="exaContainer">
        <div className="exaHeader">
          <h2 className="exaTitle">Explore Premium Tech</h2>
          <p className="exaSubtitle">Cutting-edge devices for you</p>
        </div>

        <div
          className="exaCard"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="exaImageArea">
            <div className="exaDiscount">
              <span>{currentProduct.discount}% OFF</span>
            </div>
            <div className="exaImageContainer">
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="exaImage"
              />
            </div>
            <button className="exaViewBtn">
              <span className="exaViewIcon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="M21 21l-4.35-4.35"></path>
                </svg>
              </span>
              <span>Quick View</span>
            </button>
          </div>

          <div className="exaContent">
            <div className="exaTop">
              <span className="exaCategory">{currentProduct.subCategory}</span>
              <div className="exaStars">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`exaStar ${i < Math.floor(currentProduct.rating) ? 'filled' : ''}`}
                  >
                    <svg viewBox="0 0 24 24" fill={i < Math.floor(currentProduct.rating) ? "currentColor" : "none"} stroke="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </span>
                ))}
                <span className="exaRating">{currentProduct.rating}</span>
              </div>
            </div>

            <h3 className="exaProductName">{currentProduct.name}</h3>

            <ul className="exaSpecList">
              {currentProduct.specifications.slice(0, 3).map((spec, index) => (
                <li key={index} className="exaSpecItem">
                  <span className="exaSpecIcon">✓</span>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>

            <div className="exaColorPicker">
              <span className="exaColorTitle">Colors:</span>
              <div className="exaColors">
                {currentProduct.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`exaColorBtn ${selectedColorIndex === index ? 'active' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColorIndex(index)}
                    aria-label={`Select color ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="exaPricing">
              <div className="exaPriceInfo">
                <span className="exaPrice">${currentProduct.price}</span>
                {currentProduct.oldPrice && (
                  <span className="exaOldPrice">${currentProduct.oldPrice}</span>
                )}
              </div>
              
              <div className="exaDiscount">Save ${(currentProduct.oldPrice - currentProduct.price).toFixed(2)}</div>
            </div>

            <div className="exaActions">
              <button className="exaCartBtn">
                <svg className="exaCartIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Add to Cart
              </button>
              <button className="exaWishBtn">
                <svg className="exaHeartIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="exaDots">
          {products.map((_, index) => (
            <button
              key={index}
              className={`exaDot ${index === activeProductIndex ? 'active' : ''}`}
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