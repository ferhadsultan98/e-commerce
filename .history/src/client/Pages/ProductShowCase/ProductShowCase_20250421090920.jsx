import React, { useState, useEffect } from 'react';
import './ProductShowcase.scss';

const products = [
  {
    id: 1,
    name: 'Quantum Laptop Pro',
    price: 1299,
    image: 'https://via.placeholder.com/300x300?text=Laptop',
    category: 'Laptops',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Smartphone X1',
    price: 799,
    image: 'https://via.placeholder.com/300x300?text=Smartphone',
    category: 'Smartphones',
    rating: 4.5,
  },
  {
    id: 3,
    name: 'Wireless Headphones Z',
    price: 199,
    image: 'https://via.placeholder.com/300x300?text=Headphones',
    category: 'Accessories',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Gaming Monitor Ultra',
    price: 499,
    image: 'https://via.placeholder.com/300x300?text=Monitor',
    category: 'Monitors',
    rating: 4.6,
  },
];

const ProductShowcase = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  return (
    <section className="productShowcase">
      <div className="showcaseContainer">
        <h2 className="showcaseTitle">Featured Tech Innovations</h2>
        <div className="productGrid">
          {products.map((product) => (
            <div
              key={product.id}
              className={`productCard ${hoveredProduct === product.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="cardInner">
                <div className="cardFront">
                  <img src={product.image} alt={product.name} className="productImage" />
                  <h3 className="productName">{product.name}</h3>
                  <p className="productCategory">{product.category}</p>
                </div>
                <div className="cardBack">
                  <h3 className="productName">{product.name}</h3>
                  <p className="productPrice">${product.price}</p>
                  <p className="productRating">Rating: {product.rating} ★</p>
                  <button className="buyButton">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;