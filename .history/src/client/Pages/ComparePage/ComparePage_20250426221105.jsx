import React, { useState, useEffect } from 'react';
import { db, ref, get } from '../../../server/server';
import '../../Styles/ComparePage.scss';

const ComparePage = ({ compareItems, onRemoveFromCompare }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [differentCategories, setDifferentCategories] = useState(false);
  const [viewMode, setViewMode] = useState('all'); // 'all', 'similarities', 'differences'

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

  const filteredSpecs = getFilteredSpecs();

  return (
    <div className="compare-page">
      <div className="compare-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>əlavə olunub: {compareItems.length}</h1>
        <div className="view-toggle" style={{ display: 'flex', gap: '10px' }}>
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

      <div className="compare-content" style={{ display: 'flex', flexDirection: 'row' }}>
        <div className="features-column" style={{ width: '200px', padding: '10px' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li className="feature-item" style={{ height: '200px', display: 'flex', alignItems: 'center' }}></li>
            <li className="feature-item" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>SKU</li>
            <li className="feature-item" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>Rəng</li>
            <li className="feature-item" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>Çəki</li>
            <li className="feature-item" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>Ekran</li>
            <li className="feature-item" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>Bataryanın həcmi</li>
            <li className="feature-item" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>Daxili yaddaş</li>
            <li className="feature-item" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>Ölçülər</li>
            <li className="feature-item" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>Video format</li>
            <li className="feature-item" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>Seriya</li>
            <li className="feature-item" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>SIM-kart sayı</li>
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
                  <div key={product.id} className="product-card" style={{ width: '200px', margin: '0 10px' }}>
                    <div className="product-header" style={{ height: '200px', position: 'relative' }}>
                      <img src={product.image} alt={product.name} className="product-image" style={{ width: '100%', height: '120px', objectFit: 'contain' }} />
                      <h3 style={{ fontSize: '14px', textAlign: 'center', margin: '5px 0' }}>{product.name}</h3>
                      <p style={{ textAlign: 'center', margin: '0', color: 'red', fontSize: '16px' }}>
                        {product.price} ₼{' '}
                        {product.discount && (
                          <span style={{ textDecoration: 'line-through', color: 'gray', fontSize: '14px' }}>
                            {Math.round(product.price / (1 - product.discount / 100))} ₼
                          </span>
                        )}
                      </p>
                      <button
                        className="remove-button"
                        onClick={() => onRemoveFromCompare(product.id)}
                        style={{ position: 'absolute', top: '5px', right: '5px', background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer' }}
                      >
                        ✕
                      </button>
                    </div>
                    <div className="product-details">
                      <div className="detail-item" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>{product.sku || 'N/A'}</div>
                      <div
                        className={`detail-item ${viewMode === 'differences' && compareSpecs('color').allSame ? 'similar' : 'different'}`}
                        style={{ height: '40px', display: 'flex', alignItems: 'center', backgroundColor: viewMode === 'differences' && !compareSpecs('color').allSame ? '#ffe0e0' : 'transparent' }}
                      >
                        {product.specifications.color || 'N/A'}
                      </div>
                      <div
                        className={`detail-item ${viewMode === 'differences' && compareSpecs('weight').allSame ? 'similar' : 'different'}`}
                        style={{ height: '40px', display: 'flex', alignItems: 'center', backgroundColor: viewMode === 'differences' && !compareSpecs('weight').allSame ? '#ffe0e0' : 'transparent' }}
                      >
                        {product.specifications.weight || 'N/A'}
                      </div>
                      <div
                        className={`detail-item ${viewMode === 'differences' && compareSpecs('screen').allSame ? 'similar' : 'different'}`}
                        style={{ height: '40px', display: 'flex', alignItems: 'center', backgroundColor: viewMode === 'differences' && !compareSpecs('screen').allSame ? '#ffe0e0' : 'transparent' }}
                      >
                        {product.specifications.screen || 'N/A'}
                      </div>
                      <div
                        className={`detail-item ${viewMode === 'differences' && compareSpecs('battery').allSame ? 'similar' : 'different'}`}
                        style={{ height: '40px', display: 'flex', alignItems: 'center', backgroundColor: viewMode === 'differences' && !compareSpecs('battery').allSame ? '#ffe0e0' : 'transparent' }}
                      >
                        {product.specifications.battery || 'N/A'}
                      </div>
                      <div
                        className={`detail-item ${viewMode === 'differences' && compareSpecs('storage').allSame ? 'similar' : 'different'}`}
                        style={{ height: '40px', display: 'flex', alignItems: 'center', backgroundColor: viewMode === 'differences' && !compareSpecs('storage').allSame ? '#ffe0e0' : 'transparent' }}
                      >
                        {product.specifications.storage || 'N/A'}
                      </div>
                      <div
                        className={`detail-item ${viewMode === 'differences' && compareSpecs('dimensions').allSame ? 'similar' : 'different'}`}
                        style={{ height: '40px', display: 'flex', alignItems: 'center', backgroundColor: viewMode === 'differences' && !compareSpecs('dimensions').allSame ? '#ffe0e0' : 'transparent' }}
                      >
                        {product.specifications.dimensions || 'N/A'}
                      </div>
                      <div
                        className={`detail-item ${viewMode === 'differences' && compareSpecs('videoFormat').allSame ? 'similar' : 'different'}`}
                        style={{ height: '40px', display: 'flex', alignItems: 'center', backgroundColor: viewMode === 'differences' && !compareSpecs('videoFormat').allSame ? '#ffe0e0' : 'transparent' }}
                      >
                        {product.specifications.videoFormat || 'N/A'}
                      </div>
                      <div
                        className={`detail-item ${viewMode === 'differences' && compareSpecs('series').allSame ? 'similar' : 'different'}`}
                        style={{ height: '40px', display: 'flex', alignItems: 'center', backgroundColor: viewMode === 'differences' && !compareSpecs('series').allSame ? '#ffe0e0' : 'transparent' }}
                      >
                        {product.specifications.series || 'N/A'}
                      </div>
                      <div
                        className={`detail-item ${viewMode === 'differences' && compareSpecs('simCard').allSame ? 'similar' : 'different'}`}
                        style={{ height: '40px', display: 'flex', alignItems: 'center', backgroundColor: viewMode === 'differences' && !compareSpecs('simCard').allSame ? '#ffe0e0' : 'transparent' }}
                      >
                        {product.specifications.simCard || 'N/A'}
                      </div>
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