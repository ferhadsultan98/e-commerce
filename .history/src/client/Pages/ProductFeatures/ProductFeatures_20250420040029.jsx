// client/Components/ProductFeatures/ProductFeatures.jsx
import React from "react";
import { X } from "lucide-react";
import "../../Styles/ProductFeatures.scss";

const ProductFeatures = ({ product, onClose }) => {
  // Define common specifications across all categories
  const commonSpecs = ["storage", "battery"];

  // Define category-specific specifications
  const categorySpecs = {
    laptops: ["processor", "ram", "display", "graphics"],
    phones: ["processor", "ram", "display", "camera"],
    tablets: ["processor", "ram", "display", "camera"],
    accessories: ["features", "compatibility", "material", "output", "capacity", "chip", "connectivity", "length"],
    smartwatches: ["processor", "display", "features"],
    monitors: ["size", "resolution", "refresh_rate", "panel"],
    gaming: ["storage", "features", "controller", "sensor", "weight", "switches", "connectivity"],
    storage: ["capacity", "speed", "interface", "features"],
  };

  // Get specifications for the product's category
  const specsToShow = [
    ...commonSpecs.filter((spec) => product.specifications[spec]), // Common specs
    ...(categorySpecs[product.category] || []).filter(
      (spec) => product.specifications[spec]
    ), // Category-specific specs
  ];

  return (
    <div className="productFeaturesModal">
      <div className="modalOverlay" onClick={onClose}></div>
      <div className="modalContent">
        <div className="modalHeader">
          <h2>{product.name} Xüsusiyyətləri</h2>
          <button className="closeButton" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="modalBody">
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