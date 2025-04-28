// src/client/Components/ProductCard/ProductCard.jsx
import React from "react";
import { ShoppingCart, Heart, Info } from "lucide-react";
import { GoGitCompare } from "react-icons/go";
import { Link } from "react-router-dom";
import "../../Styles/Products.scss";

const ProductCard = ({
  product,
  onAddToWishlist,
  onAddToCart,
  onAddToCompare,
  wishlistItems = [], // Add wishlistItems prop
  cartItems = [], // Add cartItems prop
}) => {
  const handleCompare = () => {
    if (typeof onAddToCompare === "function") {
      onAddToCompare(product);
    } else {
      console.warn("onAddToCompare is not a function");
    }
  };

  const isInWishlist = wishlistItems.some((item) => item.id === product.id);
  const isInCart = cartItems.some((item) => item.id === product.id);

  return (
    <div className="productCard">
      <Link to={`/product/${product.id}/features`}>
        <div className="productImageContainer">
          <div className="discountBadge">
            - <span>{product.discount}</span>%
          </div>
          <img src={product.image} alt={product.name} className="productImage" />
        </div>
        <div className="productInfo">
          <h3 className="productName">{product.name}</h3>
          <div className="productPriceContainer">
            <span className="productPrice">{product.price} ₼</span>
            <span className="productOldPrice">{product.oldPrice} ₼</span>
          </div>
        </div>
      </Link>
      <div className="productActions">
        <div className="flexActionButton">
          {!isInCart && ( // Hide cart button if item is in cart
            <button
              className="actionButton cartButton"
              onClick={() => onAddToCart(product)}
            >
              <ShoppingCart size={20} />
            </button>
          )}
          {!isInWishlist && ( // Hide wishlist button if item is in wishlist
            <button
              className="actionButton likeButton"
              onClick={() => onAddToWishlist(product)}
            >
              <Heart size={20} />
            </button>
          )}
          <button
            className="actionButton compareButton"
            onClick={handleCompare}
          >
            <GoGitCompare size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;