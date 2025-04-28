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

  // Get filtered specifications based on view mode
  const filteredSpecs = commonSpecs.filter(spec => {
    if (spec.type === 'header') return true;
    if (viewMode === 'all') return true;
    
    const { allSame } = compareSpecs(spec.key);
    if (viewMode === 'similarities' && allSame) return true;
    if (viewMode === 'differences' && !allSame) return true;
    
    return false;
  });

 

  const filteredCompareItems = compareItems.filter(product => 
    !selectedCategory || product.category === selectedCategory
  );

  return (
    <div className="comparePage">
      <div className="compareHeader">
        <h1><span></span>Müqayisə: {compareItems.length} məhsul</h1>
        
        <div className="viewToggle">
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
        <div className="categoryFilter">
          <label>Kateqoriya:</label>
          <select value={selectedCategory} onChange={handleCategoryChange}>
           
            {relevantCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {compareItems.length === 0 ? (
        <div className="emptyMessage">Müqayisə üçün məhsul əlavə edilməyib</div>
      ) : (
        <div className="compareTableContainer">
          <table className="compareTable">
            <thead>
              <tr>
                <th className="featureColumn"></th>
                {filteredCompareItems.map(product => (
                  <th key={product.id} className="productColumn">
                    <div className="productHeader">
                      {product.discount && (
                        <span className="discountBadge">-{product.discount}%</span>
                      )}
                      
                      <div className="imageContainer">
                        <img src={product.image} alt={product.name} />
                      </div>
                      
                      <h3 className="productName">{product.name}</h3>
                      
                      <div className="priceContainer">
                        <span className="currentPrice">{product.price} ₼</span>
                        {product.discount && (
                          <span className="oldPrice">
                            {Math.round(product.price / (1 - product.discount / 100))} ₼
                          </span>
                        )}
                      </div>
                      
                      <button className="addToCartButton">
                        <FiShoppingCart className="cartIcon" />
                        Səbətə əlavə et
                      </button>
                      
                      <button
                        className="removeButton"
                        onClick={() => onRemoveFromCompare(product.id)}
                        title="Müqayisədən çıxar"
                      >
                        <FiX />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="featureCell">SKU</td>
                {filteredCompareItems.map(product => (
                  <td key={product.id} className="productCell">
                    {product.sku || 'N/A'}
                  </td>
                ))}
              </tr>
              
              {filteredSpecs.map((spec, index) => {
                if (spec.type === 'header') {
                  return (
                    <tr key={index} className="headerRow">
                      <td className="featureCell headerCell" colSpan={filteredCompareItems.length + 1}>
                        {spec.label}
                      </td>
                    </tr>
                  );
                }
                
                const { allSame } = compareSpecs(spec.key);
                
                return (
                  <tr key={index} className={`specRow ${!allSame ? 'differentRow' : ''}`}>
                    <td className="featureCell">{spec.label}</td>
                    {filteredCompareItems.map(product => (
                      <td 
                        key={product.id} 
                        className={`productCell ${!allSame ? 'differentCell' : ''}`}
                      >
                        {(product.specifications && product.specifications[spec.key]) || 'N/A'}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      
      {compareItems.length > 2 && (
        <div className="scrollIndicator">
          Daha çox görmək üçün sağa sürüşdürün <FiChevronRight />
        </div>
      )}
    </div>
  );
};

export default ComparePage;