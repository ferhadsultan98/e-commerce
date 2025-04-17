// Header.jsx
import React, { useState } from "react";
import {
  Search,
  Heart,
  ShoppingCart,
  ChevronDown,
  Phone,
  MapPin,
  Tag,
  Globe,
} from "lucide-react";
import "../../Styles/Header.scss";
import logo from '../../Assets/logo.webp'

const Header = () => {
  const [language, setLanguage] = useState("en");
  const [showCategories, setShowCategories] = useState(false);

  const languages = {
    en: "English",
    az: "Azərbaycan",
    ru: "Русский",
  };

  return (
    <header className="header">
      {/* Top Header */}
      <div className="topHeader">
        <div className="container">
          <div className="topHeaderWrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>

            <div className="topHeaderNav">
              <div className="topHeaderTrending">
                <Tag size={16} />
                <span>Trending</span>
              </div>

              <div className="topHeaderLinks">
                <a href="#" className="topHeaderLink">
                  <MapPin size={16} />
                  <span>Stores</span>
                </a>
                <a href="#" className="topHeaderLink">
                  <Tag size={16} />
                  <span>Discounts</span>
                </a>
                <a href="#" className="topHeaderLink">
                  <Phone size={16} />
                  <span>*5555</span>
                </a>

                <div className="languageSelector">
                  <Globe size={16} />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    {Object.entries(languages).map(([code, name]) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </header>
  );
};

export default Header;
