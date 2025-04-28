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
    return <div className="featuredProductsLoading">Loading amazing deals...</div>;
  }

  return (
    <section className="featuredProductsSection">
      <h2 className="featuredProductsTitle">Super təkliflər</h2>
      <div className="productSlider">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="productCard">
              <div className="productCardInner">
                <div className="productImageWrapper">
                  {product.discount > 0 && (
                    <div className="discountBadge">-{product.discount}%</div>
                  )}
                  <Link to={`/product/${product.id}/features`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="productImage"
                    />
                  </Link>
                </div>
                <div className="productInfo">
                  <Link to={`/product/${product.id}/features`}>
                    <h3 className="productName">{product.name}</h3>
                  </Link>
                  <div className="productPriceRow">
                    <div className="priceInfo">
                      <span className="discountAmount">
                        -{product.discount * product.price} ₼
                      </span>
                      <span className="currentPrice">{product.price} ₼</span>
                      {product.oldPrice && (
                        <span className="oldPrice">{product.oldPrice} ₼</span>
                      )}
                    </div>
                  </div>
                  <div className="actionSection">
                    <button
                      className="addToCartButton"
                      onClick={() => onAddToCart(product)}
                      aria-label="Add to cart"
                    >
                      Sebata at
                    </button>
                    <div className="quickActions">
                      <button
                        className="actionButton wishlistButton"
                        onClick={() => onAddToWishlist(product)}
                        aria-label="Add to wishlist"
                      >
                        <Heart size={16} />
                      </button>
                      <button
                        className="actionButton compareButton"
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
          <div className="noProductsMessage">No products available</div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;