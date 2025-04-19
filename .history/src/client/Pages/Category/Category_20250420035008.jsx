// client/Pages/Category/CategoryPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../../";
import productData from "../../Pages/Products/Products.json";

const Category = () => {
  const categories = productData.categories;

  return (
    <div className="categoryPage">
      <div className="pageContainer">
        <div className="pageHeader">
          <h1>Kateqoriyalar</h1>
          <p className="categoryDescription">Məhsullarımızı kateqoriyalara görə kəşf edin.</p>
        </div>

        <div className="categoryList">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="categoryItem"
            >
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;