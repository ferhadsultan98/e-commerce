import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import productData from '../../';
import '../../Styles/ProductList.scss';

const ProductList = () => {
  const { category, subCategory } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Filter products based on category and subcategory
    const products = productData.products.filter((product) => {
      if (!subCategory) {
        return product.category === category;
      }
      return (
        product.category === category &&
        product.subCategory
          ?.toLowerCase()
          .replace(/\s+/g, '-') === subCategory
      );
    });
    setFilteredProducts(products);
  }, [category, subCategory]);

  // Get category and subcategory names for display
  const categoryName =
    productData.categories.find((cat) => cat.id === category)?.name ||
    'Products';
  const subCategoryName =
    productData.subCategories[category]?.find(
      (sub) =>
        sub.name.toLowerCase().replace(/\s+/g, '-') === subCategory
    )?.name || '';

  return (
    <div className="productListContainer">
      <div className="container">
        <h2 className="pageTitle">
          {subCategoryName
            ? `${categoryName} - ${subCategoryName}`
            : categoryName}
        </h2>
        {filteredProducts.length === 0 ? (
          <p className="noProducts">No products found in this category.</p>
        ) : (
          <div className="productGrid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="productCard">
                <div className="productImageWrapper">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="productImage"
                  />
                  {product.discount && (
                    <span className="discountBadge">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
                <div className="productDetails">
                  <h3 className="productName">{product.name}</h3>
                  <div className="priceWrapper">
                    <span className="currentPrice">${product.price}</span>
                    {product.oldPrice && (
                      <span className="oldPrice">${product.oldPrice}</span>
                    )}
                  </div>
                  <div className="productActions">
                    <button className="actionButton wishlistButton">
                      <Heart size={18} />
                      <span className="actionText">Wishlist</span>
                    </button>
                    <button className="actionButton cartButton">
                      <ShoppingCart size={18} />
                      <span className="actionText">Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;