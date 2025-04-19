// Header.jsx
import React, { useState } from "react";
import { Phone, MapPin, Tag, Globe, User } from "lucide-react";
import "../../Styles/TopHeader.scss";
import logo from "../../Assets/logo.webp";

const Header = () => {
  const [language, setLanguage] = useState("en");
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
              <a href="/">
                <img src={logo} alt="TechStore Logo" />
              </a>
            </div>
            <div className="topHeaderContact">
              <a href="tel:*5555" className="topHeaderLink">
                <Phone size={14} />
                <span>*5555</span>
              </a>
              <a href="/stores" className="topHeaderLink">
                <MapPin size={14} />
                <span>Store Locations</span>
              </a>
            </div>

            <div className="topHeaderUtils">
              <a href="/deals" className="topHeaderLink">
                <Tag size={14} />
                <span>Special Offers</span>
              </a>
              <a href="/account" className="topHeaderLink">
                <User size={14} />
                <span>Account</span>
              </a>
              <div className="languageSelector">
                <Globe size={14} />
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
    </header>
  );
};

export default Header;
