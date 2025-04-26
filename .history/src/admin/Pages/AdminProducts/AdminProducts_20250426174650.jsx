import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; // Importing Firebase config
import { collection, getDocs } from "firebase/firestore";
import "../Styles/AdminProducts.scss";

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
        const productsSnapshot = await getDocs(collection(db, "products"));
        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
        setFilteredProducts(productsData);

        const categoriesSnapshot = await getDocs(collection(db, "categories"));
        const categoriesData = categoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesData);

        const subCategoriesSnapshot = await getDocs(
          collection(db, "subCategories")
        );
        const subCategoriesData = subCategoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSubCategories(subCategoriesData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

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
          >
            <option value="all">All Subcategories</option>
            {selectedCategory !== "all" &&
              subCategories[selectedCategory]?.map((subCategory, index) => (
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
                <td>{product.oldPrice}</td>
                <td>{product.discount}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="productImagePreview"
                  />
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