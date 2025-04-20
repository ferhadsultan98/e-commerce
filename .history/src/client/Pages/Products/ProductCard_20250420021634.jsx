import React from "react";
import { ShoppingCart, Heart, Info } from "lucide-react";
import "../../Styles/Products.scss";

const ProductCard = ({ product }) => {
  return (
    <div className="productCard">
      <div className="productImageContainer">
        <div className="discountBadge">-{product.discount}%</div>
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
          <button className="actionButton cartButton">
            <ShoppingCart size={20} />
          </button>
          <button className="actionButton likeButton">
            <Heart size={20} />
          </button>
        </div>
        <button className="actionButton featuresButton">
          <Info size={20} />
          <span>Xüsusiyyətlər</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;