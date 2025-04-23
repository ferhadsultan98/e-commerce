// RelatedProducts.jsx
import React, { useState, useEffect } from 'react';
import '../../Styles/RelatedProducts.scss';

const RelatedProducts = ({ product, allProducts = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  useEffect(() => {
    if (product && allProducts.length > 0) {
      // Aynı kategorideki diğer ürünleri bul
      const sameCategoryProducts = allProducts.filter(
        p => p.category === product.category && p.id !== product.id
      );
      
      // Aynı alt kategorideki diğer ürünleri bul
      const sameSubCategoryProducts = allProducts.filter(
        p => p.subCategory === product.subCategory && p.id !== product.id
      );
      
      // Önce alt kategori ürünlerini ekle, sonra kalan kategori ürünlerini ekle
      let related = [...sameSubCategoryProducts];
      
      // Aynı alt kategoride olmayan ama ana kategorisi aynı olan ürünler
      sameCategoryProducts.forEach(p => {
        if (!related.some(r => r.id === p.id)) {
          related.push(p);
        }
      });
      
      // Maksimum 10 ürün göster
      setRelatedProducts(related.slice(0, 10));
    }
  }, [product, allProducts]);
  
  // Mevcut ekran boyutuna göre kaç ürün gösterileceğini belirler
  const getVisibleProductCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1200) return 4;
      if (window.innerWidth >= 768) return 3;
      if (window.innerWidth >= 576) return 2;
    }
    return 1;
  };
  
  const visibleProducts = getVisibleProductCount();
  const maxIndex = Math.max(0, relatedProducts.length - visibleProducts);
  
  const handlePrev = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };
  
  const handleNext = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, maxIndex));
  };
  
  // İndirim yüzdesini göster
  const renderDiscountBadge = (discount) => {
    if (!discount) return null;
    return <div className="discountBadge">-{discount}%</div>;
  };
  
  // Yıldız puanı göster
  const renderRating = (rating) => {
    if (!rating) return null;
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="ratingStars">
        {[...Array(5)].map((_, index) => (
          <span 
            key={index} 
            className={`star ${
              index < fullStars 
                ? 'full' 
                : index === fullStars && hasHalfStar 
                  ? 'half' 
                  : 'empty'
            }`}
          >
            ★
          </span>
        ))}
        <span className="ratingValue">{rating.toFixed(1)}</span>
      </div>
    );
  };
  
  // Eğer ilişkili ürün yoksa boş döndür
  if (relatedProducts.length === 0) {
    return null;
  }
  
  return (
    <div className="relatedProductsContainer">
      <h2 className="relatedProductsTitle">İlişkili Məhsullar</h2>
      
      <div className="relatedProductsWrapper">
        <button 
          className={`navButton prevButton ${currentIndex === 0 ? 'disabled' : ''}`}
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="relatedProductsSlider">
          <div 
            className="relatedProductsTrack" 
            style={{ transform: `translateX(-${currentIndex * (100 / visibleProducts)}%)` }}
          >
            {relatedProducts.map(item => (
              <div className="productCard" key={item.id}>
                <div className="productImageContainer">
                  <img 
                    src={item.image || "/api/placeholder/300/300"} 
                    alt={item.name}
                    className="productImage" 
                    onError={(e) => {
                      e.target.src = "/api/placeholder/300/300";
                    }}
                  />
                  {renderDiscountBadge(item.discount)}
                </div>
                
                <div className="productInfo">
                  <h3 className="productName">{item.name}</h3>
                  
                  <div className="productCategory">
                    <span>{item.subCategory}</span>
                  </div>
                  
                  {renderRating(item.specifications?.rating || 4.5)}
                  
                  <div className="productPriceContainer">
                    <span className="productPrice">${item.price}</span>
                    {item.oldPrice && (
                      <span className="productOldPrice">${item.oldPrice}</span>
                    )}
                  </div>
                  
                  <button className="productAddButton">Səbətə əlavə et</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          className={`navButton nextButton ${currentIndex === maxIndex ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={currentIndex === maxIndex}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RelatedProducts;