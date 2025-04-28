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
    return <div className="loadingSpinner">Loading amazing deals...</div>;
  }

  return (
    <section className="productSection">
      <h2 className="sectionTitle">Super təkliflər</h2>
      <div className="productGrid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="productCard">
              <div className="productWrapper">
                <div className="imageContainer">
                  {product.discount > 0 && (
                    <span className="discountBadge">-{product.discount}%</span>
                  )}
                  <Link to={`/product/${product.id}/features`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="productImage"
                    />
                  </Link>
                </div>
                <div className="productDetails">
                  <Link to={`/product/${product.id}/features`}>
                    <h3 className="productName">{product.name}</h3>
                  </Link>
                  <div className="priceSection">
                    <span className="discountAmount">
                      -{Math.round(product.discount * product.price)} ₼
                    </span>
                    <span className="currentPrice">{product.price} ₼</span>
                    {product.oldPrice && (
                      <span className="originalPrice">{product.oldPrice} ₼</span>
                    )}
                  </div>
                  <div className="actionButtons">
                    <button
                      className="addToCartButton"
                      onClick={() => onAddToCart(product)}
                      aria-label="Add to cart"
                    >
                      Sebata at
                    </button>
                    <div className="iconButtons">
                      <button
                        className="wishlistButton"
                        onClick={() => onAddToWishlist(product)}
                        aria-label="Add to wishlist"
                      >
                        <Heart size={16} />
                      </button>
                      <button
                        className="compareButton"
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