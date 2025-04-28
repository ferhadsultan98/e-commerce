import React, { useState, useEffect } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { GoGitCompare } from "react-icons/go";
import { Link } from "react-router-dom";
import { db, ref, get } from "../../../server/server";
import "../../Styles/FeaturedProducts.scss";

const FeaturedProducts = ({ onAddToCart, onAddToWishlist, onAddToCompare }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRef = ref(db, "products");
        const productsSnapshot = await get(productsRef);

        if (productsSnapshot.exists()) {
          const productsData = productsSnapshot.val();
          const featuredProducts = Object.values(productsData)
            .filter((product) => product.discount >= 10 && product.image)
            .slice(0, 10);

          setProducts(featuredProducts);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="perfectLoadingSpinner">Loading amazing deals...</div>;
  }

  return (
    <section className="perfectContainer">
      <h2 className="perfectHeaderTitle">Super təkliflər</h2>
      <div className="perfectProductCarousel">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="perfectItemBox">
              <div className="perfectItemWrapper">
                <div className="perfectImageHolder">
                  {product.discount > 0 && (
                    <div className="perfectDiscountTag">
                      -{product.discount}%
                    </div>
                  )}
                  <Link to={`/product/${product.id}/features`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="perfectItemImage"
                    />
                  </Link>
                </div>
                <div className="perfectDetailsSection">
                  <Link to={`/product/${product.id}/features`}>
                    <h3 className="perfectItemName">{product.name}</h3>
                  </Link>
                  <div className="perfectPriceContainer">
                    <div className="perfectPriceDetails">
                      <span className="perfectDiscountValue">
                        -{Math.round(product.discount * product.price)} ₼
                      </span>
                      <span className="perfectCurrentPrice">
                        {product.price} ₼
                      </span>
                      {product.oldPrice && (
                        <span className="perfectOldPrice">
                          {product.oldPrice} ₼
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="perfectActionArea">
                    <button
                      className="perfectAddToCartBtn"
                      onClick={() => onAddToCart(product)}
                      aria-label="Add to cart"
                    >
                      Sebata at
                    </button>
                    <div className="perfectQuickOptions">
                      <button
                        className="perfectWishlistBtn"
                        onClick={() => onAddToWishlist(product)}
                        aria-label="Add to wishlist"
                      >
                        <Heart size={16} />
                      </button>
                      <button
                        className="perfectCompareBtn"
                        onClick={() => onAddToCompare(product)}
                        aria-label="Compare product"
                      >
                        <GoGitCompare size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="perfectNoItemsMessage">No products available</div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;