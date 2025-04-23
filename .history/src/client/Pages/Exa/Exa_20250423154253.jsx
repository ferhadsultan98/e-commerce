import React, { useState, useEffect } from 'react';
import '../../Styles/Exa.scss';

const Exa = () => {
  const [activeProduct, setActiveProduct] = useState(0);
  const [hovering, setHovering] = useState(false);
  
  const products = [
    {
      id: 1,
      name: "Ultra HD Smart TV",
      price: 1299.99,
      rating: 4.8,
      image: "/api/placeholder/400/400",
      specs: ["65-inch OLED", "4K Resolution", "Smart Assistant", "HDMI 2.1"],
      colors: ["#1e1e1e", "#f5f5f7", "#0066cc"]
    },
    {
      id: 2,
      name: "Premium Wireless Headphones",
      price: 349.99,
      rating: 4.9,
      image: "/api/placeholder/400/400",
      specs: ["Active Noise Cancellation", "40hr Battery", "Voice Assistant", "Premium Sound"],
      colors: ["#333333", "#e1e1e1", "#0066cc"]
    },
    {
      id: 3,
      name: "Pro Gaming Laptop",
      price: 1899.99,
      rating: 4.7,
      image: "/api/placeholder/400/400",
      specs: ["RTX 4080", "32GB RAM", "1TB SSD", "17.3\" 240Hz Display"],
      colors: ["#222222", "#888888", "#0066cc"]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!hovering) {
        setActiveProduct((prev) => (prev + 1) % products.length);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [hovering, products.length]);

  return (
    <section className="techProductSection">
      <div className="productContainer">
        <div className="sectionHeader">
          <h2 className="sectionTitle">Featured Technology</h2>
          <p className="sectionSubtitle">Discover the latest innovations</p>
        </div>
        
        <div 
          className="productShowcase"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <div className="showcaseLeft">
            <div className="productImage">
              <span className="productBadge">New Arrival</span>
              <img 
                src={products[activeProduct].image} 
                alt={products[activeProduct].name} 
              />
              <div className="imageOverlay">
                <button className="quickViewBtn">Quick View</button>
              </div>
            </div>
          </div>
          
          <div className="showcaseRight">
            <div className="productInfo">
              <div className="productHeader">
                <span className="productCategory">Premium Tech</span>
                <div className="ratingWrapper">
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i} className={`ratingIcon ${i < Math.floor(products[activeProduct].rating) ? 'active' : ''}`}>★</span>
                  ))}
                  <span className="ratingValue">{products[activeProduct].rating}</span>
                </div>
              </div>
              
              <h3 className="productTitle">{products[activeProduct].name}</h3>
              
              <div className="productSpecs">
                {products[activeProduct].specs.map((spec, index) => (
                  <span key={index} className="specItem">{spec}</span>
                ))}
              </div>
              
              <div className="productColors">
                <span className="colorLabel">Available Colors:</span>
                <div className="colorOptions">
                  {products[activeProduct].colors.map((color, index) => (
                    <button 
                      key={index} 
                      className="colorButton" 
                      style={{ backgroundColor: color }}
                      aria-label={`Color option ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="priceContainer">
                <span className="productPrice">${products[activeProduct].price}</span>
                <span className="installmentText">or $129.99/month with 0% interest</span>
              </div>
              
              <div className="productActions">
                <button className="addCartBtn">
                  <span className="btnIcon">🛒</span>
                  Add to Cart
                </button>
                <button className="wishlistBtn">
                  <span className="btnIcon">♡</span>
                </button>
                <button className="compareBtn">
                  <span className="btnIcon">⟺</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="indicatorWrapper">
          {products.map((_, index) => (
            <button 
              key={index} 
              className={`productIndicator ${index === activeProduct ? 'active' : ''}`}
              onClick={() => setActiveProduct(index)}
              aria-label={`Show product ${index + 1}`}
            />
          ))}
        </div>
        
       
      </div>
    </section>
  );
};

export default Exa;