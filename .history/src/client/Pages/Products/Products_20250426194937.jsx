import React, { useState, useEffect, useRef } from "react";
import "../../Styles/Products.scss";
import productData from "./Products.json";
import { IoIosArrowDown } from "react-icons/io";
import ProductCard from "./ProductCard";

const Products = ({ onAddToWishlist, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [animating, setAnimating] = useState(false);
  const productsRef = useRef(null);

  // Assuming your Products.json has a categories array
  // If not, you can define it here
  const categories = [
    { id: 1, name: "Telefonlar", value: "phones" },
    { id: 2, name: "Noutbuklar", value: "laptops" },
    { id: 3, name: "Planşetlər", value: "tablets" },
    { id: 4, name: "Saatlar", value: "watches" },
    { id: 5, name: "Aksesuarlar", value: "accessories" }
  ];

  const { products } = productData;

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const handleCategoryChange = (category) => {
    if (category === activeCategory) return;
    
    setAnimating(true);
    setTimeout(() => {
      setActiveCategory(category);
      setVisibleProducts(8);
      setAnimating(false);
      
      // Scroll to top of products section when changing category
      if (productsRef.current) {
        productsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  const handleShowMore = () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    // Simulate loading delay for smooth appearance
    setTimeout(() => {
      setVisibleProducts((prev) => prev + 4);
      setIsLoading(false);
    }, 800);
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

        <div className={`productsGrid ${animating ? "fading" : ""}`}>
          {filteredProducts.slice(0, visibleProducts).map((product, index) => (
            <ProductCard
              key={`${product.id}-${activeCategory}`}
              product={product}
              onAddToWishlist={onAddToWishlist}
              onAddToCart={onAddToCart}
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
              aria-label="Show more products"
            >
              {isLoading ? (
                <div className="loadingSpinner"></div>
              ) : (
                <IoIosArrowDown size={30} />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;