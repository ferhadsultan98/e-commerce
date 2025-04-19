import React, { useState, useEffect } from "react";
import {
  Search,
  Heart,
  ShoppingCart,
  ChevronDown,
  Menu,
  X,
  Monitor,
  Smartphone,
  Tablet,
  Headphones,
  Watch,
  Gamepad,
  HardDrive,
  ChevronRight
} from "lucide-react";

import productData from "../../Pages/Products/Products.json";
import '../../Styles/BottomHeader.scss'

const BottomHeader = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = productData.categories.map(category => ({
    ...category,
    icon: {
      all: <Monitor size={18} />,
      laptops: <Monitor size={18} />,
      phones: <Smartphone size={18} />,
      tablets: <Tablet size={18} />,
      accessories: <Headphones size={18} />,
      smartwatches: <Watch size={18} />,
      monitors: <Monitor size={18} />,
      gaming: <Gamepad size={18} />,
      storage: <HardDrive size={18} />
    }[category.id]
  }));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={`bottomHeader ${scrolled ? 'fixed' : ''}`}>
        <div className="bottomContainer">
          <div className="bottomHeaderWrapper">
            <button 
              className="mobileMenuBtn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <div className="categoryButtonWrapper">
              <button
                className="categoryButton"
                onClick={() => setShowCategories(!showCategories)}
              >
                <Menu size={18} />
                <span>Categories</span>
                <ChevronDown size={14} />
              </button>

              {showCategories && (
                <div className="categoryDropdown">
                  <div className="categoryLeft">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className={`categoryItem ${
                          hoveredCategory === category.id ? "active" : ""
                        }`}
                        onMouseEnter={() => setHoveredCategory(category.id)}
                      >
                        {category.icon}
                        <span>{category.name}</span>
                        <ChevronRight size={16} className="arrow" />
                      </div>
                    ))}
                  </div>
                  <div className="categoryRight">
                    {hoveredCategory && productData.subCategories[hoveredCategory] ? (
                      <div className="subCategoryContainer">
                        <h3>{categories.find(c => c.id === hoveredCategory)?.name}</h3>
                        <div className="featuredSubcategories">
                          {productData.subCategories[hoveredCategory]
                            .filter(sub => sub.featured)
                            .map((sub, index) => (
                              <a href={`/category/${hoveredCategory}/${sub.name.toLowerCase().replace(/\s+/g, '-')}`} 
                                 key={`featured-${index}`} 
                                 className="featuredSubcategory">
                                {sub.name}
                              </a>
                            ))}
                        </div>
                        <div className="allSubcategories">
                          {productData.subCategories[hoveredCategory]
                            .filter(sub => !sub.featured)
                            .map((sub, index) => (
                              <a href={`/category/${hoveredCategory}/${sub.name.toLowerCase().replace(/\s+/g, '-')}`} 
                                 key={index} 
                                 className="subCategoryItem">
                                {sub.name}
                              </a>
                            ))}
                        </div>
                      </div>
                    ) : (
                      <div className="subCategoryPlaceholder">
                        Select a category to see products
                      </div>
                    )}
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
              <a href="/wishlist" className="actionButton wishlistButton">
                <Heart size={20} />
                <span className="badge">0</span>
                <span className="actionText">Wishlist</span>
              </a>

              <a href="/cart" className="actionButton cartButton">
                <ShoppingCart size={20} />
                <span className="badge">0</span>
                <span className="actionText">Cart</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={`mobileMenu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobileMenuHeader">
          <button 
            className="mobileCloseBtn"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <div className="mobileMenuContent">
          <div className="mobileSearch">
            <input
              type="text"
              placeholder="Search for products..."
              className="mobileSearchInput"
            />
            <button className="mobileSearchButton">
              <Search size={18} />
            </button>
          </div>
          <div className="mobileCategoryList">
            <h3>Categories</h3>
            {categories.map((category) => (
              <a href={`/category/${category.id}`} key={category.id} className="mobileCategoryItem">
                {category.icon}
                <span>{category.name}</span>
              </a>
            ))}
          </div>
      
        </div>
      </div>
    </>
  );
};

export default BottomHeader;