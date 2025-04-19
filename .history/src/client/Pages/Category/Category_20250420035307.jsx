// client/Pages/Category/CategoryPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import "../../Styles/Category.scss";
import productData from "../../Pages/Products/Products.json";

const Category = () => {
  const { categoryId } = useParams();

  // Find the category
  const category = productData.categories.find((cat) => cat.id === categoryId);

  // Get subcategories for the category
  const subCategories = productData.subCategories[categoryId] || [];

  if (!category) {
    return <div className="errorMessage">Kateqoriya tapılmadı</div>;
  }

  return (
    <div className="categoryPage">
      <div className="pageContainer">
        <div className="pageHeader">
          <h1>{category.name}</h1>
          <p className="categoryDescription">
            {category.name} kateqoriyasındakı alt kateqoriyaları kəşf edin.
          </p>
        </div>

        <div className="subCategoryList">
          {subCategories.length > 0 ? (
            subCategories.map((subCategory) => (
              <Link
                key={subCategory.name}
                to={`/category/${categoryId}/${subCategory.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="subCategoryItem"
              >
                <span>{subCategory.name}</span>
              </Link>
            ))
          ) : (
            <p>Bu kateqoriyada alt kateqoriya yoxdur.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;