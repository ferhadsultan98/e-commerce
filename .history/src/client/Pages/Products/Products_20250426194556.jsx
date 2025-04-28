import React, { useState, useEffect, useRef } from "react";
import "../../Styles/Products.scss";
import productData from "./Products.json";
import { IoIosArrowDown } from "react-icons/io";
import ProductCard from "./ProductCard";

const Products = ({ onAddToWishlist, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const productsRef = useRef(null);

  const { products, categories } = productData;

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setVisibleProducts(8);
    // Scroll to top of products section when changing category
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleShowMore = () => {
    setIsLoading(true);
    // Simulate loading delay for smooth appearance
    setTimeout(() => {
      setVisibleProducts((prev) => prev + 4);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="techStore" ref={productsRef}>
      <div className="mainWrapper">
        <div className="categoryFilter">
          <button
            className={`categoryButton ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => handleCategoryChange("all")}
          >
            Bütün məhsullar
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`categoryButton ${
                activeCategory === category.value ? "active" : ""
              }`}
              onClick={() => handleCategoryChange(category.value)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="productsGrid">
          {filteredProducts.slice(0, visibleProducts).map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToWishlist={onAddToWishlist}
              onAddToCart={onAddToCart}
              // Add delay to each product for staggered animation
              animationDelay={index % 4 * 0.1}
            />
          ))}
        </div>

        {visibleProducts < filteredProducts.length && (
          <div className="showMoreContainer">
            <button 
              className="showMoreButton" 
              onClick={handleShowMore}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loadingSpinner"></div>
              ) : (
                <IoIosArrowDown size={28} />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;