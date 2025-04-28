// src/client/Components/ProductCard/ProductCard.jsx
import React from "react";
import { ShoppingCart, Heart } from "lucide-react"; // Removed Info icon
import { GoGitCompare } from "react-icons/go";
import { Link } from "react-router-dom";
import "../../Styles/Products.scss";

const ProductCard = ({ product, onAddToWishlist, onAddToCart, onAddToCompare }) => {
  const handleCompare = () => {
    if (typeof onAddToCompare === 'function') {
      onAddToCompare(product);
    } else {
      console.warn('onAddToCompare is not a function');
    }
  };

  return (
    <Link to={`/product/${product.id}/features`} className="productCard">
      <div className="productImageContainer">
        <div className="discountBadge">- <span>{product.discount}</span>%</div>
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
        <div className="flexActionButton">
          <button
            className="actionButton cartButton"
            onClick={(e) => {
              e.preventDefault(); // Prevent Link navigation
              onAddToCart(product);
            }}
          >
            <ShoppingCart size={20} />
          </button>
          <button
            className="actionButton likeButton"
            onClick={(e) => {
              e.preventDefault(); // Prevent Link navigation
              onAddToWishlist(product);
            }}
          >
            <Heart size={20} />
          </button>
          <button
            className="actionButton compareButton"
            onClick={(e) => {
              e.preventDefault(); // Prevent Link navigation
              handleCompare();
            }}
          >
            <GoGitCompare size={20} />
          </button>
        </div>
        {/* Removed Features button */}
      </div>
    </Link>
  );
};

export default ProductCard;