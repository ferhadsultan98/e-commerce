import React from "react";
import { useParams } from "react-router-dom";
import "../../Styles/";

const SubCategoryPage = ({ categories, subCategories }) => {
  const { categoryId, subCategoryId } = useParams();

  // Kategori ve alt kategori bilgilerini bul
  const category = categories.find((cat) => cat.id === categoryId);
  const subCategory = subCategories[categoryId]?.find(
    (sub) => sub.name.toLowerCase().replace(/\s+/g, "-") === subCategoryId
  );

  if (!category || !subCategory) {
    return <div className="errorMessage">Category or Subcategory not found</div>;
  }

  return (
    <div className="subCategoryPage">
      <div className="pageContainer">
        <div className="pageHeader">
          <h1>{subCategory.name}</h1>
          <p className="categoryPath">
            {category.name} / {subCategory.name}
          </p>
        </div>

        <div className="subCategoryContent">
          <div className="descriptionSection">
            <h2>About {subCategory.name}</h2>
            <p>{subCategory.description}</p>
          </div>

          <div className="productsSection">
            <h2>Available Products</h2>
            <div className="productList">
              {subCategory.products && subCategory.products.length > 0 ? (
                subCategory.products.map((product, index) => (
                  <div key={index} className="productCard">
                    <h3>{product}</h3>
                    <p>Explore this product in {subCategory.name}.</p>
                    <a
                      href={`/product/${categoryId}/${subCategoryId}/${product
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="viewProductButton"
                    >
                      View Product
                    </a>
                  </div>
                ))
              ) : (
                <p>No products available in this subcategory.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryPage;