import React from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Heart, Info } from "lucide-react";
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
            <p>{subCategory.description || "Explore our range of products in this subcategory."}</p>
          </div>

          <div className="productsSection">
            <h2>Available Products</h2>
            <div className="productList">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="productCard">
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
                      <Link
                        to={`/product/${categoryId}/${subCategoryId}/${product.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="actionButton featuresButton"
                      >
                        <Info size={20} />
                        <span>Xüsusiyyətlər</span>
                      </Link>
                    </div>
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

export default SubCategory;