import React, { useState, useEffect } from 'react';
import { db, ref, get } from '../firebase/config';
import './FeaturedProducts.scss';

const FeaturedProducts = ({ 
  product, 
  onAddToWishlist, 
  onAddToCart, 
  onAddToCompare 
}) => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productRef = ref(db, `products/${product.id}`);
        const snapshot = await get(productRef);
        
        if (snapshot.exists()) {
          setProductData(snapshot.val());
        } else {
          console.log("No data available for this product");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [product.id]);

  if (loading) {
    return <div className="productCardSkeleton">Loading...</div>;
  }

  if (!productData) {
    return null;
  }

  const calculateDiscountPercentage = (oldPrice, currentPrice) => {
    return Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
  };

  const discountPercentage = productData.oldPrice && productData.price 
    ? calculateDiscountPercentage(productData.oldPrice, productData.price)
    : 0;

  const handleAddToCart = () => {
    onAddToCart(productData);
  };

  const handleAddToWishlist = () => {
    onAddToWishlist(productData);
  };

  const handleAddToCompare = () => {
    onAddToCompare(productData);
  };

  return (
    <div className="productCard">
      <div className="productCardImageContainer">
        {discountPercentage > 0 && (
          <div className="productCardDiscount">-{discountPercentage}%</div>
        )}
        <img 
          src={productData.image} 
          alt={productData.name} 
          className="productCardImage" 
        />
      </div>

      <div className="productCardContent">
        <div className="productCardAvailability">
          <span className="productCardAvailabilityIcon"></span>
          <span className="productCardAvailabilityText">
            {productData.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        <h3 className="productCardTitle">{productData.name}</h3>

        <div className="productCardPriceContainer">
          <div className="productCardPriceWrapper">
            <span className="productCardCurrentPrice">
              {productData.price} ₼
            </span>
            {productData.oldPrice && (
              <span className="productCardOldPrice">
                {productData.oldPrice} ₼
              </span>
            )}
          </div>
          
          {productData.installmentAvailable && (
            <div className="productCardInstallment">
              0% 12 ay
            </div>
          )}
        </div>

        <div className="productCardActions">
          <button 
            className="productCardActionButton productCardActionWishlist"
            onClick={handleAddToWishlist}
            aria-label="Add to wishlist"
          >
            <svg viewBox="0 0 24 24" className="productCardActionIcon">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
          
          <button 
            className="productCardActionButton productCardActionCompare"
            onClick={handleAddToCompare}
            aria-label="Compare"
          >
            <svg viewBox="0 0 24 24" className="productCardActionIcon">
              <path d="M6 16.5l-3 2.94V11h3m5 3.66l-1.57-1.34L8 14.64V7h3m5 6l-3 3V3h3m2.81 9.81L17 11h5v5l-1.79-1.79L13 21.36l-3.47-3.02L5.75 22H3l6.47-6.34L13 18.64" />
            </svg>
          </button>
          
          <button 
            className="productCardActionButton productCardActionCart"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <span className="productCardActionText">Səbətə at</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;