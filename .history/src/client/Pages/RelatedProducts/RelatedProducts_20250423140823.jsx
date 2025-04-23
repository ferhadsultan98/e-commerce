import React from "react";
import ProductCard from "../Products/ProductCard";

const RelatedProducts = ({ items = [], allProducts = [], onAddToWishlist, onAddToCart }) => {
  const relatedProducts = items.length > 0 && Array.isArray(allProducts)
    ? allProducts
        .filter(p => p.category === items[0].category && !items.some(item => item.id === p.id))
        .slice(0, 10)
    : [];

  return relatedProducts.length > 0 ? (
    <div className="relatedProducts">
      <h2 className="relatedProductsTitle">İlişkili Məhsullar</h2>
      <div className="relatedProductsGrid">
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToWishlist={onAddToWishlist}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default RelatedProducts;