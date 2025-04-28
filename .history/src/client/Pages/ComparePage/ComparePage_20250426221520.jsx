import React, { useState, useEffect } from 'react';
import { db, ref, get } from '../../../server/server';
import { FiShoppingCart, FiX, FiArrowRight, FiChevronRight } from 'react-icons/fi';
import '../../Styles/ComparePage.scss';

const ComparePage = ({ compareItems, onRemoveFromCompare }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [differentCategories, setDifferentCategories] = useState(false);
  const [viewMode, setViewMode] = useState('all'); // 'all', 'similarities', 'differences'
  const [loading, setLoading] = useState(true);

  // Fetch categories from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoriesRef = ref(db, 'categories');
        const categoriesSnapshot = await get(categoriesRef);

        if (categoriesSnapshot.exists()) {
          setCategories(categoriesSnapshot.val());
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
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
    const values = compareItems.map(product => 
      (product.specifications && product.specifications[key]) || 'N/A'
    );
    const allSame = values.every((val, i, arr) => val === arr[0]);
    return { values, allSame };
  };

  // Filter categories to only show those present in compareItems
  const relevantCategories = categories.filter(category =>
    compareItems.some(item => item.category === category.id)
  );

  // Filter specs based on the view mode
  const getFilteredSpecs = () => {
    const specKeys = getSpecKeys();
    if (viewMode === 'all') {
      return specKeys;
    }

    const filteredSpecs = [];
    specKeys.forEach(key => {
      const { allSame } = compareSpecs(key);
      if (viewMode === 'similarities' && allSame) {
        filteredSpecs.push(key);
      } else if (viewMode === 'differences' && !allSame) {
        filteredSpecs.push(key);
      }
    });
    return filteredSpecs;
  };

  // Common specifications for the features list
  const commonSpecs = [
    { key: 'general', label: 'Ümumi məlumat', type: 'header' },
    { key: 'color', label: 'Rəng' },
    { key: 'weight', label: 'Çəki' },
    { key: 'dimensions', label: 'Ölçülər' },
    { key: 'tech', label: 'Texniki göstəricilər', type: 'header' },
    { key: 'screen', label: 'Ekran' },
    { key: 'battery', label: 'Batareya həcmi' },
    { key: 'storage', label: 'Daxili yaddaş' },
    { key: 'camera', label: 'Kamera' },
    { key: 'processor', label: 'Prosessor' },
    { key: 'connectivity', label: 'Əlaqə', type: 'header' },
    { key: 'simCard', label: 'SIM-kart sayı' },
    { key: 'bluetooth', label: 'Bluetooth' },
    { key: 'wifi', label: 'Wi-Fi' },
    { key: 'other', label: 'Digər', type: 'header' },
    { key: 'series', label: 'Seriya' },
    { key: 'videoFormat', label: 'Video format' }
  ];

  // Calculate discount percentage
  const calculateDiscount = (currentPrice, oldPrice) => {
    if (!oldPrice || oldPrice <= currentPrice) return null;
    return Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  if (loading) {
    return <div className="loading">Yüklənir...</div>;
  }

  return (
    <div className="compare-page">
      <div className="compare-header">
        <h1>Müqayisə: {compareItems.length} məhsul</h1>
        
        <div className="view-toggle">
          <label>
            <input
              type="radio"
              name="view-mode"
              value="all"
              checked={viewMode === 'all'}
              onChange={() => setViewMode('all')}
            />
            Hamısı
          </label>
          <label>
            <input
              type="radio"
              name="view-mode"
              value="similarities"
              checked={viewMode === 'similarities'}
              onChange={() => setViewMode('similarities')}
            />
            Oxşarlıqlar
          </label>
          <label>
            <input
              type="radio"
              name="view-mode"
              value="differences"
              checked={viewMode === 'differences'}
              onChange={() => setViewMode('differences')}
            />
            Fərqlər
          </label>
        </div>
      </div>

      {differentCategories && relevantCategories.length > 0 && (
        <div className="category-filter">
          <label>Kateqoriya:</label>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Hamısı</option>
            {relevantCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {compareItems.length === 0 ? (
        <div className="empty-message">Müqayisə üçün məhsul əlavə edilməyib</div>
      ) : (
        <>
          <div className="compare-content">
            <div className="features-column">
              <ul>
                <li className="feature-item"></li>
                <li className="feature-item">SKU</li>
                {commonSpecs.map((spec, index) => (
                  <li 
                    key={index} 
                    className={`feature-item ${spec.type === 'header' ? 'header' : ''}`}
                  >
                    {spec.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="products-column">
              <div className="product-list">
                {compareItems
                  .filter(product => !selectedCategory || product.category === selectedCategory)
                  .map(product => {
                    const oldPrice = product.discount 
                      ? Math.round(product.price / (1 - product.discount / 100)) 
                      : null;
                    
                    return (
                      <div key={product.id} className="product-card">
                        <div className="product-header">
                          {product.discount && (
                            <span className="discount-badge">-{product.discount}%</span>
                          )}
                          
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="product-image" 
                          />
                          
                          <h3>{product.name}</h3>
                          
                          <div className="price-container">
                            <span className="current-price">{product.price} ₼</span>
                            {oldPrice && (
                              <span className="old-price">{oldPrice} ₼</span>
                            )}
                          </div>
                          
                          <button className="add-to-cart">
                            <FiShoppingCart style={{ marginRight: '5px' }} />
                            Səbətə əlavə et
                          </button>
                          
                          <button
                            className="remove-button"
                            onClick={() => onRemoveFromCompare(product.id)}
                            title="Müqayisədən çıxar"
                          >
                            <FiX />
                          </button>
                        </div>
                        
                        <div className="product-details">
                          <div className="detail-item">
                            {product.sku || 'N/A'}
                          </div>
                          
                          {commonSpecs.map((spec, index) => {
                            if (spec.type === 'header') {
                              return (
                                <div 
                                  key={index} 
                                  className="detail-item header"
                                >
                                  {/* Header rows are empty in product cards */}
                                </div>
                              );
                            }
                            
                            const { allSame } = compareSpecs(spec.key);
                            const isDifferent = !allSame && viewMode === 'differences';
                            const showItem = viewMode === 'all' || 
                                          (viewMode === 'similarities' && allSame) || 
                                          (viewMode === 'differences' && !allSame);
                            
                            if (!showItem && viewMode !== 'all') {
                              return null;
                            }
                            
                            return (
                              <div
                                key={index}
                                className={`detail-item ${isDifferent ? 'different' : 'similar'}`}
                              >
                                {(product.specifications && product.specifications[spec.key]) || 'N/A'}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          
          <div className="scroll-indicator">
            Daha çox görmək üçün sağa sürüşdürün <FiChevronRight />
          </div>
        </>
      )}
    </div>
  );
};

export default ComparePage;