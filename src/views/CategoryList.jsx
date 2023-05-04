import React, { useState, useEffect } from "react";
import DataController from "../controllers/DataController";
import { useNavigate } from "react-router-dom";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [visibility, setVisibility] = useState("");
  const [page, setPage] = useState(1);
  const [last_page, setLastpage] = useState();

  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate('/updatecategory', { state: { category } });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await DataController.getlistdata(
        page,
        visibility,
        search
      );
      setCategories(response.data.data);
      setLastpage(response.data.last_page);
    };
    fetchData();
  }, [page, visibility, search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleVisibilityChange = (event) => {
    setVisibility(event.target.value);
    setPage(1);
  };

  const handleAllVisibility = () => {
    setVisibility("");
    setPage(1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  return (
    <div>
      <h1>Category List</h1>
      <div>
        <label htmlFor="search">Search: </label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        <label htmlFor="visibility">Visibility: </label>
        <select
          id="visibility"
          value={visibility}
          onChange={handleVisibilityChange}
        >
          <option value="">All</option>
          <option value="1">Visible</option>
          <option value="2">Hidden</option>
        </select>
        <button onClick={handleAllVisibility}>Clear</button>
      </div>
      <ul>
        {categories.map((category) => (
          <li key={category.id} onClick={() => handleCategoryClick(category)}>{category.title}</li>
        ))}
      </ul>
      <div>
        <button onClick={handlePrevPage} disabled={page === 1}>
          Prev
        </button>
        <button onClick={handleNextPage} disabled={page >= last_page}>
          Next
        </button>
      </div>
    </div>
  );
}

export default CategoryList;
