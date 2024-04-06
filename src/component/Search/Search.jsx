import React, { useState } from "react";
import searchIcon from "../../assets/image/search-icon-sl7.png"; // Import correct image path
import userData from "../Profile/db.json"; // Assuming db.json is in the data folder
import "./Search.css"; // Import CSS file for Search component

const Search = ({ setResults }) => {
  const [searchText, setSearchText] = useState("");

  const fetchData = (value) => {
    const results = Object.values(userData).filter(
      (user) =>
        user &&
        user.name &&
        user.name.toLowerCase().includes(value.toLowerCase())
    );
    setResults(results);
  };

  const handleChange = (value) => {
    setSearchText(value);
    fetchData(value);
  };

  const handleSearchClick = () => {
    fetchData(searchText);
  };

  return (
    <>
      <header className="header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => handleChange(e.target.value)}
            className="search-in"
          />
          <button className="search-button" onClick={handleSearchClick}>
            Search
          </button>
        </div>
      </header>
    </>
  );
};

export default Search;
