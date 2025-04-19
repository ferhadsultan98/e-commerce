import React, { useState, useEffect } from 'react';
import '../../Styles/Footer.scss';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      // Burada gerçek bir API çağrısı yapılabilir
      setSubscribeStatus('success');
      setEmail('');
      setTimeout(() => {
        setSubscribeStatus(null);
      }, 3000);
    } else {
      setSubscribeStatus('error');
    }
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
              <h2>TechNova</h2>
              <p>Geleceğin teknolojisi bugün burada</p>
            </div>
            <div className="footerSocial">
              <a href="#" className="socialIcon"><i className="fa fa-facebook"></i></a>
              <a href="#" className="socialIcon"><i className="fa fa-twitter"></i></a>
              <a href="#" className="socialIcon"><i className="fa fa-instagram"></i></a>
              <a href="#" className="socialIcon"><i className="fa fa-linkedin"></i></a>
              <a href="#" className="socialIcon"><i className="fa fa-youtube"></i></a>
            </div>
          </div>
          
          <div className="footerColumn">
            <h3>Hızlı Erişim</h3>
            <ul className="footerLinks">
              <li><a href="#">Ana Sayfa</a></li>
              <li><a href="#">Ürünler</a></li>
              <li><a href="#">Kampanyalar</a></li>
              <li><a href="#">Yeni Gelenler</a></li>
              <li><a href="#">En Çok Satanlar</a></li>
            </ul>
          </div>
          
          <div className="footerColumn">
            <h3>Destek</h3>
            <ul className="footerLinks">
              <li><a href="#">Müşteri Hizmetleri</a></li>
              <li><a href="#">İade Politikası</a></li>
              <li><a href="#">Nakliye Bilgileri</a></li>
              <li><a href="#">Garanti Şartları</a></li>
              <li><a href="#">SSS</a></li>
            </ul>
          </div>
          
          <div className="footerColumn">
            <h3>Kurumsal</h3>
            <ul className="footerLinks">
              <li><a href="#">Hakkımızda</a></li>
              <li><a href="#">İletişim</a></li>
              <li><a href="#">Kariyer</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Basın Kiti</a></li>
            </ul>
          </div>
          
          <div className="footerColumn subscribeColumn">
            <h3>Abone Olun</h3>
            <p>En yeni teknoloji ürünleri ve kampanyalardan haberdar olmak için abone olun.</p>
            <form className="subscribeForm" onSubmit={handleSubmit}>
              <div className="inputGroup">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  value={email}
                  onChange={handleEmailChange}
                  className={subscribeStatus === 'error' ? 'inputError' : ''}
                />
                <button type="submit" className="subscribeButton">
                  <span>Abone Ol</span>
                </button>
              </div>
              {subscribeStatus === 'success' && (
                <div className="statusMessage successMessage">Abone olduğunuz için teşekkürler!</div>
              )}
              {subscribeStatus === 'error' && (
                <div className="statusMessage errorMessage">Lütfen geçerli bir e-posta adresi girin.</div>
              )}
            </form>
          </div>
        </div>
      </div>
      
      <div className="footerMiddle">
        <div className="footerContainer">
          <div className="paymentMethods">
            <h4>Ödeme Yöntemleri</h4>
            <div className="paymentIcons">
              <span className="paymentIcon visa"></span>
              <span className="paymentIcon mastercard"></span>
              <span className="paymentIcon paypal"></span>
              <span className="paymentIcon amex"></span>
              <span className="paymentIcon troy"></span>
            </div>
          </div>
          
          <div className="appDownload">
            <h4>Mobil Uygulamamızı İndirin</h4>
            <div className="storeButtons">
              <a href="#" className="storeButton appStore">App Store</a>
              <a href="#" className="storeButton googlePlay">Google Play</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footerBottom">
        <div className="footerContainer">
          <div className="footerCopyright">
            <p>&copy; {currentYear} TechNova. Tüm hakları saklıdır.</p>
          </div>
          <div className="footerLegal">
            <a href="#">Gizlilik Politikası</a>
            <a href="#">Kullanım Şartları</a>
            <a href="#">Çerez Politikası</a>
            <a href="#">KVKK</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;