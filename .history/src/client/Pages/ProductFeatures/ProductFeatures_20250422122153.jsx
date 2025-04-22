import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Check, Clock, Truck, Star } from "lucide-react";
import productData from "../../Pages/Products/Products.json";
import "../../Styles/ProductFeatures.scss";

const ProductFeatures = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);

  const product = productData.products.find(
    (p) => p.id === parseInt(productId)
  );

  if (!product) {
    return <div className="errorMessage">Məhsul tapılmadı</div>;
  }

  // More comprehensive specs based on product category
  const expandedSpecs = {
    laptops: {
      processor: "Prosessor",
      ram: "RAM Yaddaş",
      storage: "Daxili Yaddaş",
      display: "Ekran",
      graphics: "Qrafik Kart",
      battery: "Batareya",
      weight: "Çəki",
      dimensions: "Ölçülər",
      operatingSystem: "Əməliyyat Sistemi",
      ports: "Portlar",
      keyboard: "Klaviatura",
      webcam: "Veb Kamera",
      warranty: "Zəmanət"
    },
    phones: {
      processor: "Prosessor",
      ram: "RAM Yaddaş",
      storage: "Daxili Yaddaş",
      display: "Ekran",
      camera: "Kamera",
      battery: "Batareya",
      dimensions: "Ölçülər",
      operatingSystem: "Əməliyyat Sistemi",
      connectivity: "Əlaqə",
      fingerprint: "Barmaq izi sensoru",
      waterResistant: "Su keçirməzlik",
      warranty: "Zəmanət"
    },
    tablets: {
      processor: "Prosessor",
      ram: "RAM Yaddaş",
      storage: "Daxili Yaddaş",
      display: "Ekran",
      camera: "Kamera",
      battery: "Batareya",
      dimensions: "Ölçülər",
      operatingSystem: "Əməliyyat Sistemi",
      connectivity: "Əlaqə",
      sensors: "Sensorlar",
      warranty: "Zəmanət"
    },
    accessories: {
      features: "Xüsusiyyətlər",
      compatibility: "Uyğunluq",
      material: "Material",
      output: "Çıxış",
      capacity: "Tutum",
      chip: "Çip",
      connectivity: "Əlaqə",
      length: "Uzunluq",
      color: "Rəng",
      warranty: "Zəmanət"
    },
    smartwatches: {
      processor: "Prosessor",
      display: "Ekran",
      features: "Xüsusiyyətlər",
      battery: "Batareya",
      connectivity: "Əlaqə",
      sensors: "Sensorlar",
      waterResistant: "Su keçirməzlik",
      compatibility: "Uyğunluq",
      warranty: "Zəmanət"
    },
    monitors: {
      size: "Ölçü",
      resolution: "Çözünürlük",
      refresh_rate: "Yeniləmə tezliyi",
      panel: "Panel",
      response_time: "Cavab vaxtı",
      connectivity: "Əlaqə portları",
      ergonomics: "Ergonomika",
      features: "Xüsusiyyətlər",
      warranty: "Zəmanət"
    },
    gaming: {
      storage: "Yaddaş",
      features: "Xüsusiyyətlər",
      controller: "Kontroller",
      sensor: "Sensor",
      weight: "Çəki",
      switches: "Düymələr",
      connectivity: "Əlaqə",
      compatibility: "Uyğunluq",
      ergonomics: "Ergonomika",
      rgb: "RGB İşıqlandırma",
      warranty: "Zəmanət"
    },
    storage: {
      capacity: "Tutum",
      speed: "Sürət",
      interface: "İnterfeys",
      features: "Xüsusiyyətlər",
      form_factor: "Form faktoru",
      warranty: "Zəmanət",
      durability: "Davamlılıq",
      compatibility: "Uyğunluq"
    }
  };

  // Get category-specific specs
  const categorySpecLabels = expandedSpecs[product.category] || {};
  
  // Get all specification keys from the product
  const availableSpecs = Object.keys(product.specifications);
  
  // Simulated extra information
  const availability = Math.random() > 0.2 ? "Anbarda mövcuddur" : "Sifarişlə gətirilir";
  const deliveryTime = Math.random() > 0.5 ? "1-3 iş günü" : "3-5 iş günü";
  const rating = (Math.random() * 2 + 3).toFixed(1); // Random rating between 3.0 and 5.0
  const reviewCount = Math.floor(Math.random() * 500) + 10; // Random review count
  
  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Implement actual cart functionality
    console.log(`Added ${quantity} of ${product.name} to cart`);
    alert(`${quantity} ədəd ${product.name} səbətə əlavə edildi`);
  };

  return (
    <div className="productFeaturesPage">
      <div className="pageContainer">
        <div className="pageHeader">
          <Link to={`/category/${product.category}/${product.subCategory.toLowerCase().replace(/\s+/g, "-")}`} className="backButton">
            <ArrowLeft size={20} />
            <span>Geri</span>
          </Link>
          <h1>{product.name}</h1>
        </div>
        
        <div className="productContentWrapper">
          {/* Left column - Product image */}
          <div className="productImageSection">
            <div className="mainImageContainer">
              <span className="discountBadge">-{product.discount}%</span>
              <img src={product.image} alt={product.name} className="productMainImage" />
            </div>
            <div className="productRating">
              <div className="ratingStars">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < Math.floor(rating) ? "#FFD700" : "none"} 
                    color={i < Math.floor(rating) ? "#FFD700" : "#d9d9d9"} 
                  />
                ))}
                <span className="ratingValue">{rating}</span>
              </div>
              <span className="reviewCount">({reviewCount} rəy)</span>
            </div>
          </div>
          
          {/* Right column - Product details and features */}
          <div className="productDetailsSection">
            <div className="productInfoBlock">
              <div className="productAvailability">
                <div className={`availabilityStatus ${availability.includes("mövcuddur") ? "inStock" : "outOfStock"}`}>
                  {availability.includes("mövcuddur") ? <Check size={16} /> : <Clock size={16} />}
                  <span>{availability}</span>
                </div>
                <div className="deliveryInfo">
                  <Truck size={16} />
                  <span>Çatdırılma: {deliveryTime}</span>
                </div>
              </div>
              
              <div className="productPricing">
                <div className="priceContainer">
                  <span className="currentPrice">{product.price} ₼</span>
                  <span className="oldPrice">{product.oldPrice} ₼</span>
                  <span className="savingsAmount">Qənaət: {(product.oldPrice - product.price).toFixed(0)} ₼</span>
                </div>
                
                <div className="purchaseActions">
               
                  
                  <button className="addToCartButton" onClick={handleAddToCart}>
                    <ShoppingCart size={20} />
                    <span>Səbətə əlavə et</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="productSpecifications">
              <h2 className="sectionTitle">Xüsusiyyətlər</h2>
              <div className="specsList">
                {availableSpecs.map((spec) => (
                  <div key={spec} className="specItem">
                    <span className="specLabel">{categorySpecLabels[spec] || spec.charAt(0).toUpperCase() + spec.slice(1)}:</span>
                    <span className="specValue">{product.specifications[spec]}</span>
                  </div>
                ))}
                
                {/* Additional specifications based on category */}
                {product.category === "laptops" && !product.specifications.weight && (
                  <div className="specItem">
                    <span className="specLabel">Çəki:</span>
                    <span className="specValue">1.8 kg</span>
                  </div>
                )}
                {product.category === "laptops" && !product.specifications.dimensions && (
                  <div className="specItem">
                    <span className="specLabel">Ölçülər:</span>
                    <span className="specValue">355.7 x 248.1 x 16.8 mm</span>
                  </div>
                )}
                {product.category === "laptops" && !product.specifications.operatingSystem && (
                  <div className="specItem">
                    <span className="specLabel">Əməliyyat Sistemi:</span>
                    <span className="specValue">Windows 11 Home</span>
                  </div>
                )}
                {product.category === "laptops" && !product.specifications.ports && (
                  <div className="specItem">
                    <span className="specLabel">Portlar:</span>
                    <span className="specValue">2x USB-C, 2x USB-A, HDMI, Audio jack</span>
                  </div>
                )}
                {product.category === "laptops" && !product.specifications.warranty && (
                  <div className="specItem">
                    <span className="specLabel">Zəmanət:</span>
                    <span className="specValue">24 ay</span>
                  </div>
                )}
                
                {/* Similar conditionals for other categories */}
                {(product.category === "phones" || product.category === "tablets") && !product.specifications.dimensions && (
                  <div className="specItem">
                    <span className="specLabel">Ölçülər:</span>
                    <span className="specValue">160.7 x 77.6 x 8.2 mm</span>
                  </div>
                )}
                {(product.category === "phones" || product.category === "tablets") && !product.specifications.operatingSystem && (
                  <div className="specItem">
                    <span className="specLabel">Əməliyyat Sistemi:</span>
                    <span className="specValue">
                      {product.subCategory.includes("Apple") ? "iOS 17" : 
                       product.subCategory.includes("Samsung") ? "Android 14" : "Android 14"}
                    </span>
                  </div>
                )}
                {(product.category === "phones" || product.category === "tablets") && !product.specifications.warranty && (
                  <div className="specItem">
                    <span className="specLabel">Zəmanət:</span>
                    <span className="specValue">12 ay</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFeatures;