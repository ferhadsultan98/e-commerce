import React from 'react'

const RelatedProducts = () => {
  return (
    <div className="relatedProducts">
    <h3 className="relatedTitle">Related Products</h3>
    <div className="productGrid">
      {products.map((product, index) => (
        <div 
          key={product.id} 
          className={`productCard ${index === activeProduct ? 'active' : ''}`}
          onClick={() => setActiveProduct(index)}
        >
          <div className="cardImageWrapper">
            <img 
              src={product.image} 
              alt={product.name} 
              className="cardImage"
            />
            <div className="cardOverlay">
              <button className="cardQuickBtn">Quick View</button>
            </div>
          </div>
          <div className="cardInfo">
            <h4 className="cardTitle">{product.name}</h4>
            <div className="cardPriceRow">
              <span className="cardPrice">${product.price}</span>
              <span className="cardRating">{product.rating} ★</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default RelatedProducts