import React from "react";
import { ShoppingCart, Heart, Info } from "lucide-react";
import { Link } from "react-router-dom";
import "../../Styles/Products.scss";

const ProductCard = ({ product, onAddToWishlist, onAddToCart, animationDelay = 0 }) => {
  const cardStyle = {
    animation: `fadeIn 0.6s ease-out forwards ${animationDelay}s`
  };

  return (
    <div className="productCard" style={cardStyle}>
      <div className="productImageContainer">
        {product.discount > 0 && (
          <div className="discountBadge">-{product.discount}%</div>
        )}
        <img src={product.image} alt={product.name} className="productImage" />
      </div>
      
      <div className="productInfo">
        <h3 className="productName">{product.name}</h3>
        <div className="productPriceContainer">
          <span className="productPrice">{product.price} ₼</span>
          {product.oldPrice && product.oldPrice > product.price && (
            <span className="productOldPrice">{product.oldPrice} ₼</span>
          )}
        </div>
      </div>
      
      <div className="productActions">
        <div className="flexActionButton">
          <button
            className="actionButton cartButton"
            onClick={() => onAddToCart(product)}
            aria-label="Add to cart"
          >
            <ShoppingCart size={22} strokeWidth={2} />
          </button>
          <button
            className="actionButton likeButton"
            onClick={() => onAddToWishlist(product)}
            aria-label="Add to wishlist"
          >
            <Heart size={22} strokeWidth={2} />
          </button>
        </div>
        <Link
          to={`/product/${product.id}/features`}
          className="actionButton featuresButton"
        >
          <Info size={20} strokeWidth={2.5} />
          <span>Xüsusiyyətlər</span>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;