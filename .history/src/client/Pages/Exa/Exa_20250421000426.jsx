// Exa.jsx
import React, { useState, useEffect } from 'react';
import './Exa.scss';

const Exa = () => {
  const [activeProduct, setActiveProduct] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  const products = [
    {
      id: 1,
      name: "QuantumX Pro",
      category: "Laptops",
      price: 1299.99,
      rating: 4.8,
      image: "/api/placeholder/400/400",
      features: ["16GB RAM", "1TB SSD", "4.5GHz Processor", "15.6\" 4K Display"],
      colors: ["#1e1e1e", "#f5f5f7", "#264653"]
    },
    {
      id: 2,
      name: "SonicWave Elite",
      category: "Headphones",
      price: 349.99,
      rating: 4.9,
      image: "/api/placeholder/400/400",
      features: ["Noise Cancellation", "50hr Battery", "Spatial Audio", "Touch Controls"],
      colors: ["#2a9d8f", "#e9c46a", "#264653"]
    },
    {
      id: 3,
      name: "PrismVision Ultra",
      category: "Monitors",
      price: 899.99,
      rating: 4.7,
      image: "/api/placeholder/400/400",
      features: ["32\" 4K UHD", "144Hz Refresh", "99% sRGB", "USB-C Hub"],
      colors: ["#e76f51", "#264653", "#f5f5f7"]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setActiveProduct((prev) => (prev + 1) % products.length);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isHovering, products.length]);

  const handleColorClick = (e) => {
    e.stopPropagation();
    // In a real app, this would change product image variant
    console.log("Color selected");
  };

  return (
    <section className="techProductShowcase">
      <div className="techProductShowcase__container">
        <div className="techProductShowcase__header">
          <h2 className="techProductShowcase__title">Featured Technology</h2>
          <p className="techProductShowcase__subtitle">Discover the future today</p>
        </div>
        
        <div 
          className="techProductShowcase__carousel"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="techProductShowcase__productView">
            <div className="techProductShowcase__imageContainer">
              <div className="techProductShowcase__floatingBadge">
                New Arrival
              </div>
              <img 
                src={products[activeProduct].image} 
                alt={products[activeProduct].name}
                className="techProductShowcase__productImage"
              />
              <div className="techProductShowcase__imageOverlay">
                <button className="techProductShowcase__quickViewBtn">Quick View</button>
              </div>
            </div>
            
            <div className="techProductShowcase__productInfo">
              <div className="techProductShowcase__productHeader">
                <span className="techProductShowcase__productCategory">{products[activeProduct].category}</span>
                <div className="techProductShowcase__productRating">
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i} className={`techProductShowcase__star ${i < Math.floor(products[activeProduct].rating) ? 'techProductShowcase__star--active' : ''}`}>★</span>
                  ))}
                  <span className="techProductShowcase__ratingCount">{products[activeProduct].rating}</span>
                </div>
              </div>
              
              <h3 className="techProductShowcase__productName">{products[activeProduct].name}</h3>
              
              <div className="techProductShowcase__featuresList">
                {products[activeProduct].features.map((feature, index) => (
                  <span key={index} className="techProductShowcase__feature">{feature}</span>
                ))}
              </div>
              
              <div className="techProductShowcase__productFooter">
                <div className="techProductShowcase__colorOptions">
                  {products[activeProduct].colors.map((color, index) => (
                    <button 
                      key={index} 
                      className="techProductShowcase__colorOption" 
                      style={{ backgroundColor: color }}
                      onClick={handleColorClick}
                      aria-label={`Color option ${index + 1}`}
                    />
                  ))}
                </div>
                
                <span className="techProductShowcase__productPrice">${products[activeProduct].price}</span>
              </div>
              
              <div className="techProductShowcase__actionButtons">
                <button className="techProductShowcase__addToCartBtn">Add to Cart</button>
                <button className="techProductShowcase__wishlistBtn">♡</button>
              </div>
            </div>
          </div>
          
          <div className="techProductShowcase__indicators">
            {products.map((_, index) => (
              <button 
                key={index} 
                className={`techProductShowcase__indicator ${index === activeProduct ? 'techProductShowcase__indicator--active' : ''}`}
                onClick={() => setActiveProduct(index)}
                aria-label={`Show product ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="techProductShowcase__moreProducts">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className={`techProductShowcase__productThumbnail ${index === activeProduct ? 'techProductShowcase__productThumbnail--active' : ''}`}
              onClick={() => setActiveProduct(index)}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="techProductShowcase__thumbnailImage"
              />
              <div className="techProductShowcase__thumbnailInfo">
                <p className="techProductShowcase__thumbnailName">{product.name}</p>
                <p className="techProductShowcase__thumbnailPrice">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Exa;