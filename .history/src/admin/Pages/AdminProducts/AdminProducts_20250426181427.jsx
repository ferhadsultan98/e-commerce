import React, { useState, useEffect } from "react";
import { db, ref, get } from "../../../server/server";
import "./AdminProducts.scss";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const productsSnap = await get(ref(db, "products"));
        const categoriesSnap = await get(ref(db, "categories"));

        const productsData = productsSnap.exists() ? Object.values(productsSnap.val()) : [];
        const categoriesData = categoriesSnap.exists() ? Object.values(categoriesSnap.val()) : [];

        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);

        if (selectedCategory !== "all") {
          const selectedCat = categoriesData.find(
            (cat) => cat.id === selectedCategory
          );
          setSubCategories(selectedCat?.subCategories || []);
        } else {
          setSubCategories([]);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (selectedSubCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.subCategory === selectedSubCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.id && product.id.toString().includes(searchTerm)) ||
        (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.subCategory && product.subCategory.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply sorting if configured
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedSubCategory, searchTerm, products, sortConfig]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory("all");
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) {
      return <span className="sortIcon">↕</span>;
    }
    return sortConfig.direction === 'ascending' 
      ? <span className="sortIcon sortActive">↑</span> 
      : <span className="sortIcon sortActive">↓</span>;
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedSubCategory("all");
    setSearchTerm("");
    setSortConfig({ key: null, direction: 'ascending' });
  };

  if (isLoading) {
    return (
      <div className="productsAdminContainer">
        <div className="loadingSpinner">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="productsAdminContainer">
      <div className="adminHeader">
        <h1 className="adminTitle">Products Admin Panel</h1>
        <div className="resultsInfo">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      <div className="filtersContainer">
        <div className="filterGroup">
          <label htmlFor="categoryFilter">Category:</label>
          <select
            id="categoryFilter"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filterGroup">
          <label htmlFor="subCategoryFilter">Subcategory:</label>
          <select
            id="subCategoryFilter"
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
            disabled={selectedCategory === "all"}
          >
            <option value="all">All Subcategories</option>
            {subCategories.map((subCategory, index) => (
              <option key={index} value={subCategory.name}>
                {subCategory.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filterGroup searchGroup">
          <label htmlFor="searchInput">Search:</label>
          <div className="searchInputWrapper">
            <input
              id="searchInput"
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchTerm && (
              <button 
                className="clearSearchBtn" 
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <button className="clearFiltersBtn" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      <div className="tableContainer">
        {filteredProducts.length > 0 ? (
          <table className="productsTable">
            <thead>
              <tr>
                <th onClick={() => handleSort('id')}>
                  ID {getSortIcon('id')}
                </th>
                <th onClick={() => handleSort('name')}>
                  Name {getSortIcon('name')}
                </th>
                <th onClick={() => handleSort('category')}>
                  Category {getSortIcon('category')}
                </th>
                <th onClick={() => handleSort('subCategory')}>
                  Subcategory {getSortIcon('subCategory')}
                </th>
                <th onClick={() => handleSort('price')}>
                  Price (₼) {getSortIcon('price')}
                </th>
                <th onClick={() => handleSort('oldPrice')}>
                  Old Price (₼) {getSortIcon('oldPrice')}
                </th>
                <th onClick={() => handleSort('discount')}>
                  Discount (%) {getSortIcon('discount')}
                </th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td data-label="ID">{product.id}</td>
                  <td data-label="Name">{product.name}</td>
                  <td data-label="Category">{product.category}</td>
                  <td data-label="Subcategory">{product.subCategory}</td>
                  <td data-label="Price (₼)">{product.price}</td>
                  <td data-label="Old Price (₼)">{product.oldPrice || "-"}</td>
                  <td data-label="Discount (%)">{product.discount || "-"}</td>
                  <td data-label="Image">
                    {product.image ? (
                      <div className="imageContainer">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="productImagePreview"
                          loading="lazy"
                        />
                        <div className="imageOverlay">
                          <a href={product.image} target="_blank" rel="noopener noreferrer">
                            View
                          </a>
                        </div>
                      </div>
                    ) : (
                      <span className="noImage">No Image</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="noResultsContainer">
            <p className="noResultsMessage">
              No products found with the current filters.
            </p>
            <button className="clearFiltersBtn" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;