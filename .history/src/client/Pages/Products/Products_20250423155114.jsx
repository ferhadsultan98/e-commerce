import React, { useState } from "react";
import "../../Styles/Products.scss";
import productData from "./Products.json";
import { IoIosArrowDown } from "react-icons/io";
import ProductCard from "./ProductCard";

const Products = ({ onAddToWishlist, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleProducts, setVisibleProducts] = useState(8);

  const { products } = productData;

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const handleShowMore = () => {
    setVisibleProducts((prev) => prev + 4);
  };

  return (
    <div className="techStore">
      <div className="mainWrapper">
        <div className="productsGrid">
          {filteredProducts.slice(0, visibleProducts).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToWishlist={onAddToWishlist}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
        {visibleProducts < filteredProducts.length && (
          <div className="showMoreContainer">
            <button className="showMoreButton" onClick={handleShowMore}>
              <IoIosArrowDown fontSize={25} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
