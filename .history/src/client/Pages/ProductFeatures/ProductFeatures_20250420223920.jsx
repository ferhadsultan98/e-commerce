// client/Pages/ProductFeatures/ProductFeaturesPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import productData from "../../Pages/Products/Products.json";
import "../../Styles/ProductFeatures.scss";

const ProductFeatures = () => {
  const { productId } = useParams();


  const product = productData.products.find(
    (p) => p.id === parseInt(productId)
  );

  if (!product) {
    return <div className="errorMessage">Məhsul tapılmadı</div>;
  }


  const commonSpecs = ["storage", "battery"];


  const categorySpecs = {
    laptops: ["processor", "ram", "display", "graphics"],
    phones: ["processor", "ram", "display", "camera"],
    tablets: ["processor", "ram", "display", "camera"],
    accessories: [
      "features",
      "compatibility",
      "material",
      "output",
      "capacity",
      "chip",
      "connectivity",
      "length",
    ],
    smartwatches: ["processor", "display", "features"],
    monitors: ["size", "resolution", "refresh_rate", "panel"],
    gaming: [
      "storage",
      "features",
      "controller",
      "sensor",
      "weight",
      "switches",
      "connectivity",
    ],
    storage: ["capacity", "speed", "interface", "features"],
  };

  
  const specsToShow = [
    ...commonSpecs.filter((spec) => product.specifications[spec]),
    ...(categorySpecs[product.category] || []).filter(
      (spec) => product.specifications[spec]
    ),
  ];

  return (
    <div className="productFeaturesPage">
      <div className="pageContainer">
        <div className="pageHeader">
          <Link to={`/category/${product.category}/${product.subCategory.toLowerCase().replace(/\s+/g, "-")}`} className="backButton">
            <ArrowLeft size={20} />
            <span>Geri</span>
          </Link>
          <h1>{product.name} Xüsusiyyətləri</h1>
        </div>
        <div className="featuresContent">
          {specsToShow.length > 0 ? (
            <ul className="featuresList">
              {specsToShow.map((spec) => (
                <li key={spec} className="featureItem">
                  <span className="featureLabel">
                    {spec.charAt(0).toUpperCase() + spec.slice(1)}:
                  </span>
                  <span className="featureValue">
                    {product.specifications[spec]}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="noFeatures">Xüsusiyyətlər mövcud deyil.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFeatures;