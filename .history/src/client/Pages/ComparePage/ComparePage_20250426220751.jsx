import React, { useState, useEffect } from 'react';
import { db, ref, get } from '../../../server/server';
import '../../Styles/ComparePage.scss';

const ComparePage = ({ compareItems, onRemoveFromCompare }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [differentCategories, setDifferentCategories] = useState(false);

  // Fetch categories from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRef = ref(db, 'categories');
        const categoriesSnapshot = await get(categoriesRef);

        if (categoriesSnapshot.exists()) {
          setCategories(categoriesSnapshot.val());
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
    } else {
      setSelectedCategory('');
    }
  }, [compareItems]);

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

  // Categorize specs into similarities and differences
  const categorizeSpecs = () => {
    const specKeys = getSpecKeys();
    const similarities = [];
    const differences = [];

    specKeys.forEach(key => {
      const { values, allSame } = compareSpecs(key);
      if (allSame && values[0] !== 'N/A') {
        similarities.push({ key, values });
      } else {
        differences.push({ key, values });
      }
    });

    return { similarities, differences };
  };

  const { similarities, differences } = categorizeSpecs();

  // Filter categories to only show those present in compareItems
  const relevantCategories = categories.filter(category =>
    compareItems.some(item => item.category === category.id)
  );

  return (
    <div className="compare-page">
      <div className="compare-header">
        <h1>Product Comparison</h1>
        {differentCategories && (
          <div className="category-selector" style={{ position: 'absolute', right: '20px', top: '20px' }}>
            <label htmlFor="category-select">Filter by Category: </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {relevantCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="compare-content" style={{ display: 'flex', flexDirection: 'row' }}>
        {/* All Specs Section */}
        <div className="compare-section" style={{ marginBottom: '40px' }}>
          <h3>All Specs</h3>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className="features-column" style={{ width: '200px', padding: '10px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li className="feature-item" style={{ height: '150px', display: 'flex', alignItems: 'center' }}>Name</li>
                <li className="feature-item" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>Price</li>
                <li className="feature-item" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>Discount</li>
                {getSpecKeys().map(key => (
                  <li key={key} className="feature-item" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="products-column" style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
              <div className="product-list" style={{ display: 'flex', flexDirection: 'row' }}>
                {compareItems.length === 0 ? (
                  <div className="empty-message">No products selected for comparison</div>
                ) : (
                  compareItems
                    .filter(product => !selectedCategory || product.category === selectedCategory)
                    .map(product => (
                      <div key={product.id} className="product-card" style={{ width: '200px', margin: '0 10px' firstborn-child}}>
                        <div className="product-header" style={{ height: '150px', position: 'relative' }}>
                          <img src={product.image} alt={product.name} className="product-image" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                          <button
                            className="remove-button"
                            onClick={() => onRemoveFromCompare(product.id)}
                            style={{ position: 'absolute', top: '5px', right: '5px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px' }}
                          >
                            ✕
                          </button>
                        </div>
                        <div className="product-details">
                          <div className="detail-item" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>{product.name}</div>
                          <div className="detail-item" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>
                            {product.price} ₼ {product.discount && <span className="discount">({product.discount}% off)</span>}
                          </div>
                          <div className="detail-item" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>{product.discount || 'N/A'}</div>
                          {getSpecKeys().map(key => {
                            const { values, allSame } = compareSpecs(key);
                            const value = product.specifications[key] || 'N/A';
                            return (
                              <div
                                key={key}
                                className={`detail-item ${allSame && values[0] !== 'N/A' ? 'similar' : 'different'}`}
                                style={{ height: '40px', display: 'flex', alignItems: 'center', backgroundColor: allSame && values[0] !== 'N/A' ? '#e0ffe0' : '#ffe0e0' }}
                              >
                                {value}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))
                )
              </div>
            </div>
          </div>
        </div>

        {/* Similarities Section */}
        <div className="compare-section" style={{ marginBottom: '40px' }}>
          <h3>Similarities</h3>
          {similarities.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div className="features-column" style={{ width: '200px', padding: '10px' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {similarities.map(({ key }) => (
                    <li key={key} className="feature-item" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="products-column" style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                <div className="product-list" style={{ display: 'flex', flexDirection: 'row' }}>
                  {compareItems
                    .filter(product => !selectedCategory || product.category === selectedCategory)
                    .map(product => (
                      <div key={product.id} className="product-card" style={{ width: '200px', margin: '0 10px' }}>
                        <div className="product-details">
                          {similarities.map(({ key, values }) => {
                            const value = product.specifications[key] || 'N/A';
                            return (
                              <div
                                key={key}
                                className="detail-item similar"
                                style={{ height: '40px', display: 'flex', alignItems: 'center', backgroundColor: '#e0ffe0' }}
                              >
                                {value}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <p>No similarities found.</p>
          )}
        </div>

        {/* Differences Section */}
        <div className="compare-section">
          <h3>Differences</h3>
          {differences.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div className="features-column" style={{ width: '200px', padding: '10px' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {differences.map(({ key }) => (
                    <li key={key} className="feature-item" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="products-column" style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                <div className="product-list" style={{ display: 'flex', flexDirection: 'row' }}>
                  {compareItems
                    .filter(product => !selectedCategory || product.category === selectedCategory)
                    .map(product => (
                      <div key={product.id} className="product-card" style={{ width: '200px', margin: '0 10px' }}>
                        <div className="product-details">
                          {differences.map(({ key, values }) => {
                            const value = product.specifications[key] || 'N/A';
                            return (
                              <div
                                key={key}
                                className="detail-item different"
                                style={{ height: '40px', display: 'flex', alignItems: 'center', backgroundColor: '#ffe0e0' }}
                              >
                                {value}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <p>No differences found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparePage;