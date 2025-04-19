import React, { useState } from "react";
import { FiPhone, FiMapPin, FiTag, FiGlobe, FiUser, FiMenu, FiX } from "react-icons/fi";
import "../../Styles/TopHeader.scss"
import logo from "../../Assets/logo.webp";

const TopHeader = () => {
  const [language, setLanguage] = useState("en");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages = {
    en: "English",
    az: "Azərbaycan",
    ru: "Русский",
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="headerContainer">
        {/* Logo */}
        <div className="headerLogo">
          <a href="/">
            <img src={logo} alt="TechTrend Logo" />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="headerNav">
          <div className="headerContact">
            <a href="tel:*5555" className="headerLink">
              <FiPhone size={16} />
              <span>*5555</span>
            </a>
            <a href="/stores" className="headerLink">
              <FiMapPin size={16} />
              <span>Stores</span>
            </a>
          </div>

          <div className="headerUtils">
            <a href="/deals" className="headerLink">
              <FiTag size={16} />
              <span>Deals</span>
            </a>
            <a href="/account" className="headerLink">
              <FiUser size={16} />
              <span>Account</span>
            </a>
            <div className="headerLanguage">
              <FiGlobe size={16} />
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
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="headerMobileToggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav className={`headerMobileNav ${isMobileMenuOpen ? "active" : ""}`}>
        <div className="headerMobileContact">
          <a href="tel:*5555" className="headerLink">
            <FiPhone size={16} />
            <span>*5555</span>
          </a>
          <a href="/stores" className="headerLink">
            <FiMapPin size={16} />
            <span>Stores</span>
          </a>
        </div>
        <div className="headerMobileUtils">
          <a href="/deals" className="headerLink">
            <FiTag size={16} />
            <span>Deals</span>
          </a>
          <a href="/account" className="headerLink">
            <FiUser size={16} />
            <span>Account</span>
          </a>
          <div className="headerLanguage">
            <FiGlobe size={16} />
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
      </nav>
    </header>
  );
};

export default TopHeader;