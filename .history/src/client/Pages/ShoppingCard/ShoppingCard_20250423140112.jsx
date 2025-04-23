import React from "react";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import "../../Styles/ShoppingCard.scss";
import ProductCard from "../Products/ProductCard";

const ShoppingCard = ({ cartItems = [], onRemoveFromCart, onAddToWishlist, onAddToCart, allProducts = [] }) => {
  const [quantities, setQuantities] = React.useState(
    cartItems.reduce((acc, item) => {
      acc[item.id] = item.quantity || 1;
      return acc;
    }, {})
  );

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setQuantities({
      ...quantities,
      [itemId]: newQuantity,
    });
  };

  const calculateItemTotal = (item) => {
    const quantity = quantities[item.id] || 1;
    return item.discountPrice ? item.discountPrice * quantity : item.price * quantity;
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + calculateItemTotal(item),
    0
  );

  const totalItems = Object.values(quantities).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  const getRelatedProducts = () => {
    if (cartItems.length === 0 || !Array.isArray(allProducts)) return [];
    return allProducts
      .filter(p => p.category === cartItems[0].category && !cartItems.some(c => c.id === p.id))
      .slice(0, 10);
  };

  const relatedProducts = getRelatedProducts();

  return (
    <div className="shopping-cart">
      <div className="shopping-cart__header">
        <ShoppingCart size={24} />
        <h2 className="shopping-cart__title">My Shopping Cart</h2>
        <span className="shopping-cart__count">{totalItems} items</span>
      </div>

      {cartItems.length === 0 ? (
        <div className="shopping-cart__empty">
          <ShoppingCart size={64} />
          <p className="shopping-cart__empty-message">Your cart is empty</p>
          <Link to="/products" className="shopping-cart__continue-shopping">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="shopping-cart__content">
          <div className="shopping-cart__items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item__image-container">
                  <img src={item.image} alt={item.name} className="cart-item__image" />
                </div>
                
                <div className="cart-item__details">
                  <h3 className="cart-item__name">{item.name}</h3>
                  
                  <div className="cart-item__price-container">
                    {item.discountPrice ? (
                      <>
                        <span className="cart-item__price cart-item__price--original">
                          {item.price.toFixed(2)} ₼
                        </span>
                        <span className="cart-item__price cart-item__price--discount">
                          {item.discountPrice.toFixed(2)} ₼
                        </span>
                        <span className="cart-item__discount-badge">
                          {Math.round(((item.price - item.discountPrice) / item.price) * 100)}% OFF
                        </span>
                      </>
                    ) : (
                      <span className="cart-item__price">{item.price.toFixed(2)} ₼</span>
                    )}
                  </div>
                  
                  <div className="cart-item__quantity">
                    <button
                      className="cart-item__quantity-btn"
                      onClick={() => updateQuantity(item.id, quantities[item.id] - 1)}
                      disabled={quantities[item.id] <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="cart-item__quantity-value">{quantities[item.id] || 1}</span>
                    <button
                      className="cart-item__quantity-btn"
                      onClick={() => updateQuantity(item.id, quantities[item.id] + 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <div className="cart-item__actions">
                    <Link
                      to={`/product/${item.id}/features`}
                      className="cart-item__view-details"
                    >
                      View Details
                    </Link>
                    <button
                      className="cart-item__remove"
                      onClick={() => onRemoveFromCart(item.id)}
                    >
                      <Trash2 size={16} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
                
                <div className="cart-item__total">
                  <span className="cart-item__total-label">Subtotal:</span>
                  <span className="cart-item__total-value">
                    {calculateItemTotal(item).toFixed(2)} ₼
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="shopping-cart__summary">
            <h3 className="shopping-cart__summary-title">Order Summary</h3>
            
            <div className="shopping-cart__summary-items">
              <div className="summary-row">
                <span>Items ({totalItems}):</span>
                <span>{totalPrice.toFixed(2)} ₼</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              {cartItems.some(item => item.discountPrice) && (
                <div className="summary-row summary-row--savings">
                  <span>Savings:</span>
                  <span>
                    -{cartItems.reduce((sum, item) => {
                      if (item.discountPrice) {
                        return sum + ((item.price - item.discountPrice) * (quantities[item.id] || 1));
                      }
                      return sum;
                    }, 0).toFixed(2)} ₼
                  </span>
                </div>
              )}
            </div>
            
            <div className="summary-row summary-row--total">
              <span>Total:</span>
              <span>{totalPrice.toFixed(2)} ₼</span>
            </div>
            
            <button className="shopping-cart__checkout-btn">
              Proceed to Checkout
            </button>
            
            <Link to="/products" className="shopping-cart__continue-btn">
              Continue Shopping
            </Link>
          </div>
         
        </div>
         {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2 className="related-products__title">İlişkili Məhsullar</h2>
            <div className="related-products__grid">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToWishlist={onAddToWishlist}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        )}
      )}
    </div>
  );
};

export default ShoppingCard;