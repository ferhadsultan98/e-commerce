import React from "react";
import { Heart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import "../../Styles/Wishlist.scss";

const Wishlist = ({ wishlistItems, onRemoveFromWishlist }) => {
  return (
    <div className="wishlistContainer">
      <h2 className="wishlistTitle">My Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p className="emptyMessage">Your wishlist is empty.</p>
      ) : (
        <div className="wishlistGrid">
          {wishlistItems.map((item) => (
            <div key={item.id} className="wishlistItem">
              <img
                src={item.image}
                alt={item.name}
                className="wishlistItemImage"
              />
              <div className="wishlistItemInfo">
                <h3 className="wishlistItemName">{item.name}</h3>
                <p className="wishlistItemPrice">{item.price} ₼</p>
                <Link
                  to={`/product/${item.id}/features`}
                  className="wishlistItemLink"
                >
                  View Details
                </Link>
              </div>
              <button
                className="removeButton"
                onClick={() => onRemoveFromWishlist(item.id)}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;