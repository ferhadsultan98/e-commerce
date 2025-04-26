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

  useEffect(() => {
    const fetchData = async () => {
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
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedSubCategory, searchTerm, products]);

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

  return (
    <div className="productsAdminContainer">
      <h1 className="adminTitle">Products Admin Panel</h1>

      <div className="filtersContainer">
        <div className="filterGroup">
          <label htmlFor="categoryFilter">Category:</label>
          <select
            id="categoryFilter"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="all">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
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
          >
            <option value="all">All Subcategories</option>
            {subCategories.map((subCategory, index) => (
              <option key={index} value={subCategory.name}>
                {subCategory.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filterGroup">
          <label htmlFor="searchInput">Search:</label>
          <input
            id="searchInput"
            type="text"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="tableContainer">
        <table className="productsTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Price (₼)</th>
              <th>Old Price (₼)</th>
              <th>Discount (%)</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.subCategory}</td>
                <td>{product.price}</td>
                <td>{product.oldPrice || "-"}</td>
                <td>{product.discount || "-"}</td>
                <td>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="productImagePreview"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
