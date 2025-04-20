import React from "react";
import { ShoppingCart, Heart, Info, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import "../../Styles/Wishlist.scss";

const WishList = ({ wishlistItems, onRemoveFromWishlist, onAddToWishlist, onAddToCart }) => {
  return (
    <div className="wishlistContainer">
      <h2 className="wishlistTitle">My Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p className="wishlistEmptyMessage">Your wishlist is empty.</p>
      ) : (
        <div className="wishlistGrid">
          {wishlistItems.map((product) => (
            <div key={product.id} className="productCard">
              <div className="productImageContainer">
                <div className="discountBadge">-{product.discount}%</div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="productImage"
                />
              </div>
              <div className="productInfo">
                <h3 className="productName">{product.name}</h3>
                <div className="productPriceContainer">
                  <span className="productPrice">{product.price} ₼</span>
                  <span className="productOldPrice">{product.oldPrice} ₼</span>
                </div>
              </div>
              <div className="productActions">
                <div className="flexActionButton">
                  <button
                    className="actionButton cartButton"
                    onClick={() => onAddToCart(product)}
                  >
                    <ShoppingCart size={20} />
                  </button>
                  <button
                    className="actionButton likeButton"
                    onClick={() => onRemoveFromWishlist(product.id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <Link
                  to={`/product/${product.id}/features`}
                  className="actionButton featuresButton"
                >
                  <Info size={20} />
                  <span>Xüsusiyyətlər</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;