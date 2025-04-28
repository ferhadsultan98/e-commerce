// src/client/Pages/ComparePage/ComparePage.jsx
import React, { useState, useEffect } from 'react';
import { db, ref, get } from '../../../server/'; // Firebase imports
import '../../Styles/ComparePage.scss';

const ComparePage = ({ compareItems, onRemoveFromCompare }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [differentCategories, setDifferentCategories] = useState(false);

  // Fetch categories and products from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRef = ref(db, 'categories');
        const productsRef = ref(db, 'products');

        const categoriesSnapshot = await get(categoriesRef);
        const productsSnapshot = await get(productsRef);

        if (categoriesSnapshot.exists()) {
          setCategories(categoriesSnapshot.val());
        }
        if (productsSnapshot.exists()) {
          const productList = productsSnapshot.val();
          setAllProducts(productList);
          setProducts(productList);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Check if products are from different categories
  useEffect(() => {
    const uniqueCategories = new Set(compareItems.map(item => item.category));
    setDifferentCategories(uniqueCategories.size > 1);

    if (uniqueCategories.size === 1) {
      setSelectedCategory([...uniqueCategories][0]);
      setProducts(allProducts.filter(product => product.category === [...uniqueCategories][0]));
    } else if (selectedCategory) {
      setProducts(allProducts.filter(product => product.category === selectedCategory));
    } else {
      setProducts(allProducts);
    }
  }, [compareItems, selectedCategory, allProducts]);

  // Get all unique specification keys
  const getSpecKeys = () => {
    const specKeys = new Set();
    compareItems.forEach(product => {
      Object.keys(product.specifications || {}).forEach(key => specKeys.add(key));
    });
    return Array.from(specKeys);
  };

  // Compare specification values to determine similarity
  const compareSpecs = (key) => {
    const values = compareItems.map(product => product.specifications[key] || 'N/A');
    const allSame = values.every((val, i, arr) => val === arr[0]);
    return { values, allSame };
  };

  return (
    <div className="compare-page">
      <div className="compare-header">
        <h1>Product Comparison</h1>
        {differentCategories && (
          <div className="category-selector">
            <label htmlFor="category-select">Category: </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="compare-content">
        <div className="features-column">
          <h3>Features</h3>
          <ul>
            <li className="feature-item">Name</li>
            <li className="feature-item">Price</li>
            <li className="feature-item">Discount</li>
            {getSpecKeys().map(key => (
              <li key={key} className="feature-item">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </li>
            ))}
          </ul>
        </div>

        <div className="products-column">
          <div className="product-list">
            {compareItems.length === 0 ? (
              <div className="empty-message">Select products to compare</div>
            ) : (
              compareItems
                .filter(product => !selectedCategory || product.category === selectedCategory)
                .map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-header">
                      <img src={product.image} alt={product.name} className="product-image" />
                      <button
                        className="remove-button"
                        onClick={() => onRemoveFromCompare(product.id)}
                      >
                        ✕
                      </button>
                    </div>
                    <div className="product-details">
                      <div className="detail-item">{product.name}</div>
                      <div className="detail-item">
                        ${product.price} {product.discount && <span className="discount">({product.discount}% off)</span>}
                      </div>
                      <div className="detail-item">{product.discount || 'N/A'}</div>
                      {getSpecKeys().map(key => {
                        const { values, allSame } = compareSpecs(key);
                        const value = product.specifications[key] || 'N/A';
                        return (
                          <div
                            key={key}
                            className={`detail-item ${allSame && values[0] !== 'N/A' ? 'similar' : 'different'}`}
                          >
                            {value}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;