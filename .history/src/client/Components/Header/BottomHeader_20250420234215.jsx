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
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import productData from "../../Pages/Products/Products.json";
import "../../Styles/BottomHeader.scss";

const BottomHeader = ({ onAddToWishlist, onAddToCart }) => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [showCategories, setShowCategories] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubCategory, setActiveSubCategory] = useState(null);

  const categories = productData.categories.map((category) => ({
    ...category,
    icon: {
      laptops: <Monitor size={18} />,
      phones: <Smartphone size={18} />,
      tablets: <Tablet size={18} />,
      accessories: <Headphones size={18} />,
      smartwatches: <Watch size={18} />,
      monitors: <Monitor size={18} />,
      gaming: <Gamepad size={18} />,
      storage: <HardDrive size={18} />,
    }[category.id],
  }));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubCategoryClick = (categoryId) => {
    setActiveSubCategory(categoryId);
    setShowCategories(false);
  };

  const handleAddToWishlist = (product) => {
    setWishlistCount((prev) => prev + 1);
    onAddToWishlist(product);
  };

  const handleAddToCart = (product) => {
    setCartCount((prev) => prev + 1);
    onAddToCart(product);
  };

  return (
    <>
      <div className={`bottomHeader ${scrolled ? "fixed" : ""}`}>
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
                      <Link
                        to={`/category/${category.id}`}
                        key={category.id}
                        className={`categoryItem ${
                          hoveredCategory === category.id ? "active" : ""
                        }`}
                        onMouseEnter={() => setHoveredCategory(category.id)}
                      >
                        {category.icon}
                        <span>{category.name}</span>
                        <ChevronRight size={16} className="arrow" />
                      </Link>
                    ))}
                  </div>
                  <div className="categoryRight">
                    {hoveredCategory &&
                    productData.subCategories[hoveredCategory] ? (
                      <div className="subCategoryContainer">
                        <h3>
                          {
                            categories.find((c) => c.id === hoveredCategory)
                              ?.name
                          }
                        </h3>
                        <div className="featuredSubcategories">
                          {productData.subCategories[hoveredCategory]
                            .filter((sub) => sub.featured)
                            .map((sub, index) => (
                              <Link
                                to={`/category/${hoveredCategory}/${sub.name
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                                key={`featured-${index}`}
                                className="featuredSubcategory"
                                onClick={() =>
                                  handleSubCategoryClick(hoveredCategory)
                                }
                              >
                                {sub.name}
                              </Link>
                            ))}
                        </div>
                        <div className="allSubcategories">
                          {productData.subCategories[hoveredCategory]
                            .filter((sub) => !sub.featured)
                            .map((sub, index) => (
                              <Link
                                to={`/category/${hoveredCategory}/${sub.name
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                                key={index}
                                className="subCategoryItem"
                                onClick={() =>
                                  handleSubCategoryClick(hoveredCategory)
                                }
                              >
                                {sub.name}
                              </Link>
                            ))}
                        </div>
                      </div>
                    ) : (
                      <div className="subCategoryPlaceholder">
                        Kateqoriya seçin
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
              <Link to="/wishlist" className="actionButton wishlistButton">
                <Heart size={20} />
                <span className="badge">{wishlistCount}</span>
                <span className="actionText">Wishlist</span>
              </Link>

              <Link to="/" className="actionButton cartButton">
                <ShoppingCart size={20} />
                <span className="badge">{cartCount}</span>
                <span className="actionText">Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={`mobileMenu ${mobileMenuOpen ? "open" : ""}`}>
  <div className="mobileMenuHeader">
    <button
      className="mobileCloseBtn"
      onClick={() => setMobileMenuOpen(false)}
    >
      <X size={24} />
    </button>
  </div>
  <div className="mobileMenuContent">
    <div className="mobileCategoryList">
      <h3>Categories</h3>
      {categories.map((category) => (
        <Link
          to={`/category/${category.id}`}
          key={category.id}
          className="mobileCategoryItem"
          onClick={() => {
            handleSubCategoryClick(category.id);
            setMobileMenuOpen(false); 
          }}
        >
          {category.icon}
          <span>{category.name}</span>
        </Link>
      ))}
    </div>
  </div>
</div>
    </>
  );
};

export default BottomHeader;