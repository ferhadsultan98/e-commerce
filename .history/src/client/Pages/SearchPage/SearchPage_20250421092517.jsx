import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import productData from "../";
import "../../Styles/SearchPage.scss";
import ProductCard from "../Products/ProductCard";

const SearchPage = ({ onAddToWishlist, onAddToCart }) => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const query = new URLSearchParams(location.search).get("q")?.toLowerCase() || "";

  useEffect(() => {
    const results = productData.products.filter((product) =>
      product.name.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query)
    );
    setSearchResults(results);
  }, [query]);

  return (
    <div className="searchPage">
      <div className="searchPageContainer">
        <h1 className="searchTitle">
          Search Results for "{query}" ({searchResults.length} items)
        </h1>
        {searchResults.length > 0 ? (
          <div className="searchResults">
            {searchResults.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToWishlist={onAddToWishlist}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="noResults">
            No products found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;