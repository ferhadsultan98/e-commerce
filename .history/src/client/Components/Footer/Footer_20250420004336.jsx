import React, { useState, useEffect } from "react";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube } from "react-icons/fi";
import "./Footer.scss";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setSubscribeStatus("success");
      setEmail("");
      setTimeout(() => {
        setSubscribeStatus(null);
      }, 3000);
    } else {
      setSubscribeStatus("error");
    }
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="footerWrapper">
      <div className="footerTop">
        <div className="footerContainer">
          <div className="footerColumn">
            <div className="footerLogo">
              <h2>TechTrend</h2>
              <p>Tomorrow's technology, today</p>
            </div>
            <div className="footerSocial">
              <a href="#" className="socialIcon">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="socialIcon">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="socialIcon">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="socialIcon">
                <FiLinkedin size={20} />
              </a>
              <a href="#" className="socialIcon">
                <FiYoutube size={20} />
              </a>
            </div>
          </div>

          <div className="footerColumn">
            <h3>Quick Links</h3>
            <ul className="footerLinks">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Products</a>
              </li>
              <li>
                <a href="#">Deals</a>
              </li>
              <li>
                <a href="#">New Arrivals</a>
              </li>
              <li>
                <a href="#">Best Sellers</a>
              </li>
            </ul>
          </div>

          <div className="footerColumn">
            <h3>Support</h3>
            <ul className="footerLinks">
              <li>
                <a href="#">Customer Service</a>
              </li>
              <li>
                <a href="#">Return Policy</a>
              </li>
              <li>
                <a href="#">Shipping Info</a>
              </li>
              <li>
                <a href="#">Warranty Terms</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
            </ul>
          </div>

          <div className="footerColumn">
            <h3>Company</h3>
            <ul className="footerLinks">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Press Kit</a>
              </li>
            </ul>
          </div>

          <div className="footerColumn subscribeColumn">
            <h3>Subscribe</h3>
            <p>Stay updated on the latest tech products and deals.</p>
            <div className="subscribeForm" onSubmit={handleSubmit}>
              <div className="inputGroup">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={handleEmailChange}
                  className={subscribeStatus === "error" ? "inputError" : ""}
                />
                <button type="submit" className="subscribeButton">
                  <span>Subscribe</span>
                </button>
              </div>
              {subscribeStatus === "success" && (
                <div className="statusMessage successMessage">
                  Thanks for subscribing!
                </div>
              )}
              {subscribeStatus === "error" && (
                <div className="statusMessage errorMessage">
                  Please enter a valid email address.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="footerBottom">
        <div className="footerContainer">
          <div className="footerCopyright">
            <p>© {currentYear} TechTrend. All rights reserved.</p>
          </div>
          <div className="footerLegal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Cookie Policy</a>
            <a href="#">GDPR</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;