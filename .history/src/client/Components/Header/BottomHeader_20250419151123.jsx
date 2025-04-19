import React, { useState } from "react";
import "../../Styles/Header.scss";

const BottomHeader = () => {

  const [showCategories, setShowCategories] = useState(false);
  
  return (
    <div className="bottomHeader">
      <div className="container">
        <div className="bottomHeaderWrapper">
          <button
            className="categoryButton"
            onClick={() => setShowCategories(!showCategories)}
          >
            <span>See Categories</span>
            <ChevronDown size={16} />
          </button>

          <div className="searchWrapper">
            <input
              type="text"
              placeholder="Search for products..."
              className="searchInput"
            />
            <button className="searchButton">
              <Search size={18} />
            </button>
          </div>

          <div className="headerActions">
            <a href="#" className="wishlistButton">
              <Heart size={20} />
              <span className="badge">0</span>
            </a>

            <a href="#" className="cartButton">
              <ShoppingCart size={20} />
              <span className="badge">0</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomHeader;
