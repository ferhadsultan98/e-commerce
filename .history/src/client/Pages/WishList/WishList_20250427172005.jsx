import React from "react";
import { ShoppingCart, Heart, Trash2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import "../../Styles/WishList.scss";
import RelatedProducts from "../RelatedProducts/RelatedProducts";

const WishList = ({ wishlistItems = [], onRemoveFromWishlist, onAddToCart, onAddToWishlist, allProducts = [] }) => {
  return (
    <div className="wishlist">
      <div className="wishlist__header">
        <Heart size={24} />
        <h2 className="wishlist__title">My Wishlist</h2>
        <span className="wishlist__count">{wishlistItems.length} items</span>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="wishlist__empty">
          <Heart size={64} />
          <p className="wishlist__empty-message">Your wishlist is empty</p>
          <p className="wishlist__empty-description">
            Items added to your wishlist will be saved here
          </p>
          <Link to="/products" className="wishlist__browse-products">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="wishlist__content">
          <div className="wishlist__grid">
            {wishlistItems.map((product) => (
              <div key={product.id} className="wishlist-item">
                <div className="wishlist-item__image-wrapper">
                  {product.discount > 0 && (
                    <div className="wishlist-item__discount">
                      -{product.discount}%
                    </div>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="wishlist-item__image"
                  />
                  <button
                    className="wishlist-item__remove"
                    onClick={() => onRemoveFromWishlist(product.id)}
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="wishlist-item__content">
                  <h3 className="wishlist-item__name">{product.name}</h3>

                  <div className="wishlist-item__price-container">
                    <span className="wishlist-item__price">
                      {product.price} ₼
                    </span>
                    {product.oldPrice && (
                      <span className="wishlist-item__old-price">
                        {product.oldPrice} ₼
                      </span>
                    )}
                  </div>

                  <div className="wishlist-item__actions">
                    <button
                      className="wishlist-item__cart-btn"
                      onClick={() => onAddToCart(product)}
                    >
                      <ShoppingCart size={18} />
                      <span>Add to Cart</span>
                    </button>

                    <Link
                      to={`/product/${product.id}/features`}
                      className="wishlist-item__details-btn"
                    >
                      <AlertCircle size={18} />
                      <span>Xüsusiyyətlər</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <RelatedProducts
            items={wishlistItems}
            allProducts={allProducts}
            onAddToWishlist={onAddToWishlist}
            onAddToCart={onAddToCart}
          />
        </div>
      )}
    </div>
  );
};

export default WishList;