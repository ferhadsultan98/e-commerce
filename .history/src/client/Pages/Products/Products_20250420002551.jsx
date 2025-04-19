import React, { useState } from "react";
import "../../Styles/Products.scss";
import { ShoppingCart, Heart, Info } from "lucide-react";
import productData from "./Products.json";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleProducts, setVisibleProducts] = useState(8); // 3 rows * 3 products per row

  const { products } = productData;

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const handleShowMore = () => {
    setVisibleProducts((prev) => prev + 6); // 2 rows * 3 products per row
  };

  return (
    <div className="techStore">
      <div className="mainWrapper">
        <div className="productsGrid">
          {filteredProducts.slice(0, visibleProducts).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {visibleProducts < filteredProducts.length && (
          <div className="showMoreContainer">
            <button className="showMoreButton" onClick={handleShowMore}>
              More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

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

export default Products;