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
import BottomHeader from "./BottomHeader";

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
              <img src={logo} alt="logo"/>
              </a>
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

     <BottomHeader/>
    </header>
  );
};

export default Header;
