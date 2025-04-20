// client/Components/ProductCard/ProductCard.jsx
import React, { useState } from "react";
import { ShoppingCart, Heart, Info } from "lucide-react";
import ProductFeatures from "../ProductFeatures/ProductFeatures";
import "../../Styles/Products.scss";

const ProductCard = ({ product }) => {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

  const handleOpenFeatures = () => {
    setIsFeaturesOpen(true);
  };

  const handleCloseFeatures = () => {
    setIsFeaturesOpen(false);
  };

  return (
    <>
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
          <button
            className="actionButton featuresButton"
            onClick={handleOpenFeatures}
          >
            <Info size={20} />
            <span>Xüsusiyyətlər</span>
          </button>
        </div>
      </div>
      {isFeaturesOpen && (
        <ProductFeatures product={product} onClose={handleCloseFeatures} />
      )}
    </>
  );
};

export default ProductCard;