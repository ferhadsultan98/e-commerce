import React, { useState } from "react";
import "../../Styles/Products.scss";
import { ShoppingCart, Heart, Info } from "lucide-react";
import productData from "./Products.json";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const { categories, products } = productData;

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <div className="techStore">
      <nav className="categoryNavbar">
        <div className="navWrapper">
          <div className="categoryList">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`categoryItem ${
                  activeCategory === category.id ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </nav>

      <div className="mainWrapper">
        <div className="productsGrid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
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
        <button className="actionButton cartButton">
          <ShoppingCart size={20} />
          <span>
            <SlBasket />
          </span>
        </button>
        <button className="actionButton likeButton">
          <Heart size={20} />
        </button>
        <button className="actionButton featuresButton">
          <Info size={20} />
          <span>Xüsusiyyətlər</span>
        </button>
      </div>
    </div>
  );
};

export default Products;
