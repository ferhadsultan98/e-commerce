import React, { useState, useEffect } from 'react';
import { db, ref, get } from '../../'; 
import './ComparePage.scss';

const ComparePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('phones'); // Default category
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // All products for dropdown

  // Fetch data from Firebase
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
          setProducts(productList.filter(product => product.category === selectedCategory));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Update products when category changes
  useEffect(() => {
    setProducts(allProducts.filter(product => product.category === selectedCategory));
    setSelectedProducts([]); // Clear selected products when category changes
  }, [selectedCategory, allProducts]);

  // Handle adding a product to comparison
  const handleAddProduct = (productId) => {
    if (selectedProducts.length >= 4) {
      alert('You can compare up to 4 products at a time.');
      return;
    }
    const productToAdd = products.find(product => product.id === parseInt(productId));
    if (productToAdd && !selectedProducts.some(p => p.id === productToAdd.id)) {
      setSelectedProducts([...selectedProducts, productToAdd]);
    }
  };

  // Handle removing a product from comparison
  const handleRemoveProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(product => product.id !== productId));
  };

  // Get all unique specification keys
  const getSpecKeys = () => {
    const specKeys = new Set();
    selectedProducts.forEach(product => {
      Object.keys(product.specifications || {}).forEach(key => specKeys.add(key));
    });
    return Array.from(specKeys);
  };

  // Compare specification values to determine similarity
  const compareSpecs = (key) => {
    const values = selectedProducts.map(product => product.specifications[key] || 'N/A');
    const allSame = values.every((val, i, arr) => val === arr[0]);
    return { values, allSame };
  };

  return (
    <div className="compare-page">
      <div className="compare-header">
        <h1>Product Comparison</h1>
        <div className="category-selector">
          <label htmlFor="category-select">Category: </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
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
          <div className="product-selector">
            <select
              onChange={(e) => handleAddProduct(e.target.value)}
              value=""
              disabled={selectedProducts.length >= 4}
            >
              <option value="" disabled>Select a product to compare</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="product-list">
            {selectedProducts.length === 0 ? (
              <div className="empty-message">Select products to compare</div>
            ) : (
              selectedProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-header">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveProduct(product.id)}
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