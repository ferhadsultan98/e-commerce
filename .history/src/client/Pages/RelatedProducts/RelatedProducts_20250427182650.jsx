import React from "react";
import Slider from "react-slick";
import ProductCard from "../Products/";
import "../../Styles/RelatedProducts.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RelatedProducts = ({ items = [], allProducts = [], onAddToWishlist, onAddToCart, onAddToCompare }) => {
  const relatedProducts = items.length > 0 && Array.isArray(allProducts)
    ? allProducts
        .filter(p => p.category === items[0].category && !items.some(item => item.id === p.id))
        .slice(0, 10)
    : [];

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: relatedProducts.length > 1,
    speed: 500,
    slidesToShow: Math.min(relatedProducts.length, 4),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(relatedProducts.length, 3),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(relatedProducts.length, 2),
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return relatedProducts.length > 0 ? (
    <div className="related-products">
      <h2 className="related-products__title">İlişkili Məhsullar</h2>
      <Slider {...sliderSettings}>
        {relatedProducts.map((product) => (
          <div key={product.id} className="related-products__slide">
            <ProductCard
              product={product}
              onAddToWishlist={onAddToWishlist}
              onAddToCart={onAddToCart}
              onAddToCompare={onAddToCompare} {/* <-- ƏLAVƏ ETTİK */}
            />
          </div>
        ))}
      </Slider>
    </div>
  ) : null;
};

export default RelatedProducts;
