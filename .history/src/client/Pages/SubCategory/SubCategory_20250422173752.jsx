import React from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../Products/ProductCard";
import "../../Styles/SubCategory.scss";
import productData from "../../Pages/Products/Products.json";

const SubCategory = () => {
  const { categoryId, subCategoryId } = useParams();

  // Find the category
  const category = productData.categories.find((cat) => cat.id === categoryId);

  // Find the subcategory
  const subCategory = productData.subCategories[categoryId]?.find(
    (sub) => sub.name.toLowerCase().replace(/\s+/g, "-") === subCategoryId
  );

  // Filter products that match the category and subcategory
  const products = productData.products.filter(
    (product) =>
      product.category === categoryId && product.subCategory === subCategory?.name
  );

  // Handlers for wishlist and cart actions
  const handleAddToWishlist = (product) => {
    // Implement wishlist logic here
    console.log(`Added ${product.name} to wishlist`);
  };

  const handleAddToCart = (product) => {
    // Implement cart logic here
    console.log(`Added ${product.name} to cart`);
  };

  if (!category || !subCategory) {
    return <div className="errorMessage">Kateqoriya və ya alt kateqoriya tapılmadı</div>;
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
            <h2>{subCategory.name} haqqında</h2>
            <p>
              {subCategory.description ||
                "Bu alt kateqoriyadakı məhsullarımızı kəşf edin."}
            </p>
          </div>

          <div className="productsSection">
            <h2>Mövcud Məhsullar</h2>
            <div className="productList">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    onAddToWishlist={handleAddToWishlist}
                    onAddToCart={handleAddToCart}
                  />
                ))
              ) : (
                <p>Bu alt kateqoriyada məhsul yoxdur.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategory;