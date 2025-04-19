import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import "../../Styles/Header.scss";

const BottomHeader = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const dropdownRef = useRef(null);

  // Sample data - replace with your actual data
//   const categoriesData = [
//     {
//       id: "electronics",
//       name: "Electronics",
//       companies: ["Apple", "Samsung", "Sony", "LG", "Xiaomi"]
//     },
//     {
//       id: "computers",
//       name: "Computers",
//       companies: ["HP", "Dell", "Lenovo", "Asus", "Acer"]
//     },
//     {
//       id: "smartphones",
//       name: "Smartphones",
//       companies: ["Apple", "Samsung", "Xiaomi", "Huawei", "OnePlus"]
//     },
//     {
//       id: "accessories",
//       name: "Accessories",
//       companies: ["Logitech", "Razer", "JBL", "Anker", "Belkin"]
//     },
//     {
//       id: "homeAppliances",
//       name: "Home Appliances",
//       companies: ["Bosch", "Siemens", "Whirlpool", "Electrolux", "Arçelik"]
//     }
//   ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategories(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Set the first category as active when opening the dropdown
  useEffect(() => {
    if (showCategories && categoriesData.length > 0 && !activeCategory) {
      setActiveCategory(categoriesData[0].id);
    }
  }, [showCategories, categoriesData, activeCategory]);

  return (
    <div className="bottomHeader">
      <div className="container">
        <div className="bottomHeaderWrapper">
          <div className="categoryContainer" ref={dropdownRef}>
            <button
              className="categoryButton"
              onClick={() => setShowCategories(!showCategories)}
            >
              <span>See Categories</span>
              <ChevronDown size={16} />
            </button>

            {showCategories && (
              <div className="categoryDropdown">
                <div className="categoryPanel">
                  <div className="categoryList">
                    {categoriesData.map((category) => (
                      <div
                        key={category.id}
                        className={`categoryItem ${
                          activeCategory === category.id ? "active" : ""
                        }`}
                        onMouseEnter={() => setActiveCategory(category.id)}
                      >
                        <span>{category.name}</span>
                        <ChevronRight size={16} />
                      </div>
                    ))}
                  </div>
                  <div className="companyPanel">
                    {activeCategory && (
                      <div className="companyList">
                        <h4 className="companyPanelTitle">
                          {categoriesData.find(c => c.id === activeCategory)?.name}
                        </h4>
                        <div className="companyGrid">
                          {categoriesData
                            .find(c => c.id === activeCategory)
                            ?.companies.map((company, index) => (
                              <a href="#" key={index} className="companyItem">
                                {company}
                              </a>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

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