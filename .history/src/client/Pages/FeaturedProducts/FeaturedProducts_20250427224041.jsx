import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { db, ref, get } from "../../../server/server";
import "../../Styles/FeaturedProducts.scss";

const FeaturedProducts = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRef = ref(db, "products");
        const productsSnapshot = await get(productsRef);

        if (productsSnapshot.exists()) {
          const productsData = productsSnapshot.val();
          // Filter to get only featured products (with discount >= 10%)
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
                  <div className="productSpecs">
                    {product.specifications &&
                      Object.entries(product.specifications)
                        .slice(0, 2)
                        .map(([key, value]) => (
                          <div key={key} className="specItem">
                            <span className="specName">{key}:</span> {value}
                          </div>
                        ))}
                  </div>
                  <div className="productPriceRow">
                    <div className="priceInfo">
                      <span className="currentPrice">{product.price} ₼</span>
                      {product.oldPrice && (
                        <span className="oldPrice">{product.oldPrice} ₼</span>
                      )}
                    </div>
                    <button
                      className="addToCartButton"
                      onClick={() => onAddToCart(product)}
                      aria-label="Add to cart"
                    >
                      <ShoppingCart size={18} />
                    </button>
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