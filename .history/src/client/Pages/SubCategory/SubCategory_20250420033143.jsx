import React from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Heart, Info } from "lucide-react";
import productData from "../../Pages/Products/Products.json";
import 
const SubCategoryPage = () => {
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
    return <div className="error-message">Category or Subcategory not found</div>;
  }
  
  return (
    <div className="subcategory-page">
      <div className="page-container">
        <div className="page-header">
          <h1>{subCategory.name}</h1>
          <p className="category-path">
            <Link to={`/category/${categoryId}`} className="category-link">{category.name}</Link> / {subCategory.name}
          </p>
        </div>
        
        <div className="subcategory-content">
          <div className="description-section">
            <h2>About {subCategory.name}</h2>
            <p>{subCategory.description || "Explore our range of products in this subcategory."}</p>
          </div>
          
          <div className="products-section">
            <h2>Available Products</h2>
            <div className="product-list">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-image-container">
                      {product.discount > 0 && (
                        <div className="discount-badge">-{product.discount}%</div>
                      )}
                      <img src={product.image} alt={product.name} className="product-image" />
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-price-container">
                        <span className="product-price">{product.price} ₼</span>
                        {product.oldPrice && (
                          <span className="product-old-price">{product.oldPrice} ₼</span>
                        )}
                      </div>
                    </div>
                    <div className="product-actions">
                      <div className="flex-action-button">
                        <button className="action-button cart-button">
                          <ShoppingCart size={20} />
                        </button>
                        <button className="action-button like-button">
                          <Heart size={20} />
                        </button>
                      </div>
                      <Link
                        to={`/product/${categoryId}/${subCategoryId}/${product.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="action-button features-button"
                      >
                        <Info size={20} />
                        <span>Xüsusiyyətlər</span>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-products">
                  <p>No products available in this subcategory.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryPage;