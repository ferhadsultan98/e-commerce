import React from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import "../../Styles/ShoppingCard.scss";

const ShoppingCard = ({ cartItems, onRemoveFromCart }) => {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cartContainer">
      <h2 className="cartTitle">My Cart</h2>
      {cartItems.length === 0 ? (
        <p className="emptyMessage">Your cart is empty.</p>
      ) : (
        <>
          <div className="cartGrid">
            {cartItems.map((item) => (
              <div key={item.id} className="cartItem">
                <img src={item.image} alt={item.name} className="cartItemImage" />
                <div className="cartItemInfo">
                  <h3 className="cartItemName">{item.name}</h3>
                  <p className="cartItemPrice">{item.price} ₼</p>
                  <Link
                    to={`/product/${item.id}/features`}
                    className="cartItemLink"
                  >
                    View Details
                  </Link>
                </div>
                <button
                  className="removeButton"
                  onClick={() => onRemoveFromCart(item.id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
          <div className="cartSummary">
            <h3 className="cartSummaryTitle">Cart Summary</h3>
            <p className="cartTotal">Total: {totalPrice.toFixed(2)} ₼</p>
            <button className="checkoutButton">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCard;