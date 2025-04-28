import React, { useState, useEffect, useRef } from "react";
import { ShoppingCart, Heart, ArrowRight, ArrowLeft } from "lucide-react";
import { GoGitCompare } from "react-icons/go";
import { Link } from "react-router-dom";
import { db, ref, get } from "../../../server/server";
import "../../Styles/FeaturedProducts.scss";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRef = ref(db, "categories");
        const productsRef = ref(db, "products");
        
        const [categoriesSnapshot, productsSnapshot] = await Promise.all([
          get(categoriesRef),
          get(productsRef)
        ]);
        
        if (categoriesSnapshot.exists() && productsSnapshot.exists()) {
          const categoriesData = categoriesSnapshot.val();
          const productsData = productsSnapshot.val();
          
          // Filter to get only featured products
          const featuredProducts = Object.values(productsData).filter(product => 
            product.discount >= 10 && product.image
          ).slice(0, 10);
          
          setProducts(featuredProducts);
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  // Handling slider drag events
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiplier for faster scroll
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);
    // Implement your cart logic here
  };

  const handleAddToWishlist = (product) => {
    console.log("Adding to wishlist:", product);
    // Implement your wishlist logic here
  };

  const handleCompare = (product) => {
    console.log("Adding to compare:", product);
    // Implement your compare logic here
  };

  const handleScrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div className="featuredProductsLoading">Loading amazing deals...</div>;
  }

  return (
    <section className="featuredProductsSection">
      <div className="featuredProductsHeader">
        <h2 className="featuredProductsTitle">Günün Təklifləri</h2>
        <div className="categoryTabs">
          <button 
            className={`categoryTab ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            Hamısı
          </button>
          {categories.slice(0, 5).map((category) => (
            <button
              key={category.id}
              className={`categoryTab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="navigationControls">
          <button className="navButton" onClick={handleScrollLeft}>
            <ArrowLeft size={20} />
          </button>
          <button className="navButton" onClick={handleScrollRight}>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      
      <div 
        className="productSlider"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="productCard">
              <div className="productCardInner">
                <div className="productImageWrapper">
                  <div className="discountBadge">-{product.discount}%</div>
                  <Link to={`/product/${product.id}/features`}>
                    <img src={product.image} alt={product.name} className="productImage" />
                  </Link>
                  <div className="quickActions">
                    <button 
                      className="actionButton wishlistButton" 
                      onClick={() => handleAddToWishlist(product)}
                      aria-label="Add to wishlist"
                    >
                      <Heart size={18} />
                    </button>
                    <button 
                      className="actionButton compareButton" 
                      onClick={() => handleCompare(product)}
                      aria-label="Compare product"
                    >
                      <GoGitCompare size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="productInfo">
                  <Link to={`/product/${product.id}/features`}>
                    <h3 className="productName">{product.name}</h3>
                  </Link>
                  <div className="productSpecs">
                    {product.specifications && Object.entries(product.specifications).slice(0, 3).map(([key, value]) => (
                      <div key={key} className="specItem">
                        <span className="specName">{key}:</span> {value}
                      </div>
                    ))}
                  </div>
                  <div className="productPriceRow">
                    <div className="priceInfo">
                      <span className="currentPrice">{product.price} ₼</span>
                      <span className="oldPrice">{product.oldPrice} ₼</span>
                    </div>
                    <button 
                      className="addToCartButton" 
                      onClick={() => handleAddToCart(product)}
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
          <div className="noProductsMessage">No products available in this category</div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;