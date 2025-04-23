import React, { useState } from "react";

const RelatedProducts = () => {
  const [activeProduct, setActiveProduct] = useState(0);

  const products = [
    {
      id: 1,
      name: "Ultra HD Smart TV",
      price: 1299.99,
      rating: 4.8,
      image: "/api/placeholder/400/400",
      specs: ["65-inch OLED", "4K Resolution", "Smart Assistant", "HDMI 2.1"],
      colors: ["#1e1e1e", "#f5f5f7", "#0066cc"],
    },
    {
      id: 2,
      name: "Premium Wireless Headphones",
      price: 349.99,
      rating: 4.9,
      image: "/api/placeholder/400/400",
      specs: [
        "Active Noise Cancellation",
        "40hr Battery",
        "Voice Assistant",
        "Premium Sound",
      ],
      colors: ["#333333", "#e1e1e1", "#0066cc"],
    },
    {
      id: 3,
      name: "Pro Gaming Laptop",
      price: 1899.99,
      rating: 4.7,
      image: "/api/placeholder/400/400",
      specs: ["RTX 4080", "32GB RAM", "1TB SSD", '17.3" 240Hz Display'],
      colors: ["#222222", "#888888", "#0066cc"],
    },
  ];

  return (
    <div className="relatedProducts">
      <h3 className="relatedTitle">Related Products</h3>
      <div className="productGrid">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`productCard ${index === activeProduct ? "active" : ""}`}
            onClick={() => setActiveProduct(index)}
          >
            <div className="cardImageWrapper">
              <img
                src={product.image}
                alt={product.name}
                className="cardImage"
              />
              <div className="cardOverlay">
                <button className="cardQuickBtn">Quick View</button>
              </div>
            </div>
            <div className="cardInfo">
              <h4 className="cardTitle">{product.name}</h4>
              <div className="cardPriceRow">
                <span className="cardPrice">${product.price}</span>
                <span className="cardRating">{product.rating} ★</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
