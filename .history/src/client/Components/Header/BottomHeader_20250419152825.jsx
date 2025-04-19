import React, { useState } from "react";
import "../../Styles/Header.scss";
import { Search, Heart, ShoppingCart, ChevronDown } from "lucide-react";
import productData from "../../Pages";

const BottomHeader = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const { categories } = productData;

  // Mapping of categories to their subcategories/brands (based on the image structure)
  const subCategories = {
    laptops: [
      "Dell qrup bağlayıcılar",
      "Dell-n aksesuarlar",
      "Nivələşdirici ölçülər",
      "Masafa ölçənlər",
      "Detektorlar",
    ],
    phones: [
      "Sərfiyyat məhsulları",
      "Burğular",
      "Elektrik alətlər üçün akkumulyator bağlayıcılar",
      "Kəsici alətlər üçün disklər",
    ],
    tablets: [
      "Qaynaq avadanlıqları",
      "Generatorlar",
      "Kompressorlar",
      "Sü nasos pompalan",
    ],
    accessories: [
      "Sənətçilər",
      "Duş sistemləri",
      "Çəkmə dəstəkləri",
      "Təpə düzləri",
    ],
    smartwatches: [
      "Ülgücələr",
      "Sənətçilər",
      "Duş sistemləri",
      "Çəkmə dəstəkləri",
    ],
    monitors: [
      "Boyalar",
      "Pnevmatik boya çiləyiciləri",
      "Çəkiclər",
      "İsgənələr",
    ],
    gaming: [
      "Rangsız küvetlər",
      "Spalettələr",
      "Boyalar",
      "Pnevmatik boya çiləyiciləri",
    ],
    storage: [
      "Açarlar",
      "Mismarçəkənlər",
      "Mismar tapancaları",
      "Hermetik tapancalar",
    ],
  };

  return (
    <div className="bottomHeader">
      <div className="container">
        <div className="bottomHeaderWrapper">
          <div className="categoryButtonWrapper">
            <button
              className="categoryButton"
              onClick={() => setShowCategories(!showCategories)}
            >
              <span>Kateqoriyalar</span>
              <ChevronDown size={16} />
            </button>

            {showCategories && (
              <div className="categoryDropdown">
                <div className="categoryLeft">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className={`categoryItem ${
                        hoveredCategory === category.id ? "hovered" : ""
                      }`}
                      onMouseEnter={() => setHoveredCategory(category.id)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
                <div className="categoryRight">
                  {hoveredCategory && subCategories[hoveredCategory] ? (
                    subCategories[hoveredCategory].map((sub, index) => (
                      <div key={index} className="subCategoryItem">
                        {sub}
                      </div>
                    ))
                  ) : (
                    <div className="subCategoryPlaceholder">
                      Kateqoriyanı seçin
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="searchWrapper">
            <input
              type="text"
              placeholder="Məhsul axtar..."
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
  );
};

export default BottomHeader;