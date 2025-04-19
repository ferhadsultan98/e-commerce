// BottomHeader.jsx
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


const BottomHeader = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Categories with icons
  const categories = [
    { id: "laptops", name: "Laptops", icon: <Monitor size={18} /> },
    { id: "phones", name: "Smartphones", icon: <Smartphone size={18} /> },
    { id: "tablets", name: "Tablets", icon: <Tablet size={18} /> },
    { id: "accessories", name: "Accessories", icon: <Headphones size={18} /> },
    { id: "smartwatches", name: "Smartwatches", icon: <Watch size={18} /> },
    { id: "monitors", name: "Monitors", icon: <Monitor size={18} /> },
    { id: "gaming", name: "Gaming", icon: <Gamepad size={18} /> },
    { id: "storage", name: "Storage", icon: <HardDrive size={18} /> },
  ];

  // Subcategories mapping
  const subCategories = {
    laptops: [
      { name: "Gaming Laptops", featured: true },
      { name: "Business Laptops", featured: true },
      { name: "Dell", featured: false },
      { name: "HP", featured: false },
      { name: "Lenovo", featured: false },
      { name: "Apple MacBook", featured: false },
      { name: "ASUS", featured: false },
      { name: "MSI", featured: false },
    ],
    phones: [
      { name: "Apple iPhone", featured: true },
      { name: "Samsung Galaxy", featured: true },
      { name: "Xiaomi", featured: false },
      { name: "Google Pixel", featured: false },
      { name: "OnePlus", featured: false },
      { name: "OPPO", featured: false },
      { name: "Vivo", featured: false },
      { name: "Nothing", featured: false },
    ],
    tablets: [
      { name: "Apple iPad", featured: true },
      { name: "Samsung Galaxy Tab", featured: true },
      { name: "Lenovo Tab", featured: false },
      { name: "Amazon Fire", featured: false },
      { name: "Huawei MatePad", featured: false },
      { name: "Xiaomi Pad", featured: false },
    ],
    accessories: [
      { name: "Headphones", featured: true },
      { name: "Chargers", featured: true },
      { name: "Cases", featured: false },
      { name: "Screen Protectors", featured: false },
      { name: "Cables", featured: false },
      { name: "Power Banks", featured: false },
      { name: "Wireless Earbuds", featured: false },
    ],
    smartwatches: [
      { name: "Apple Watch", featured: true },
      { name: "Samsung Galaxy Watch", featured: true },
      { name: "Fitbit", featured: false },
      { name: "Garmin", featured: false },
      { name: "Xiaomi Mi Band", featured: false },
      { name: "Huawei Watch", featured: false },
    ],
    monitors: [
      { name: "Gaming Monitors", featured: true },
      { name: "4K Monitors", featured: true },
      { name: "Ultrawide", featured: false },
      { name: "LG", featured: false },
      { name: "Samsung", featured: false },
      { name: "Dell", featured: false },
      { name: "ASUS", featured: false },
    ],
    gaming: [
      { name: "Gaming Consoles", featured: true },
      { name: "Gaming Accessories", featured: true },
      { name: "PlayStation", featured: false },
      { name: "Xbox", featured: false },
      { name: "Nintendo", featured: false },
      { name: "Gaming Mice", featured: false },
      { name: "Gaming Keyboards", featured: false },
    ],
    storage: [
      { name: "External Hard Drives", featured: true },
      { name: "SSDs", featured: true },
      { name: "USB Flash Drives", featured: false },
      { name: "Memory Cards", featured: false },
      { name: "NAS", featured: false },
      { name: "HDD", featured: false },
    ],
  };

  // Handle scroll event to fix header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`bottomHeader ${scrolled ? 'fixed' : ''}`}>
        <div className="container">
          <div className="bottomHeaderWrapper">
            {/* Mobile menu button */}
            <button 
              className="mobileMenuBtn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {/* Category button */}
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
                    {hoveredCategory && subCategories[hoveredCategory] ? (
                      <div className="subCategoryContainer">
                        <h3>{categories.find(c => c.id === hoveredCategory)?.name}</h3>
                        <div className="featuredSubcategories">
                          {subCategories[hoveredCategory]
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
                          {subCategories[hoveredCategory]
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

            {/* Search */}
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

            {/* Actions */}
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

      {/* Mobile Menu */}
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
          <div className="mobileLinks">
            <a href="/account" className="mobileLink">
             
              <FaUser size={18}/>

              <span>My Account</span>
            </a>
            <a href="/wishlist" className="mobileLink">
              <Heart size={18} />
              <span>Wishlist</span>
            </a>
            <a href="/cart" className="mobileLink">
              <ShoppingCart size={18} />
              <span>Cart</span>
            </a>
            <a href="/stores" className="mobileLink">
              <MapPin size={18} />
              <span>Store Locations</span>
            </a>
            <a href="/deals" className="mobileLink">
              <Tag size={18} />
              <span>Deals & Promotions</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomHeader;