import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import "./Header.css";
import logo from "./image-removebg-preview.png";
import SearchResultList from "../Search/SearchResultList";

const Header = () => {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/src/component/Profile/db.json");
        const jsonData = await response.json();
        setData(Object.values(jsonData));
        console.log(Object.values(jsonData));
      } catch (error) {
        console.error("Error fetching data: ", error);
        setData([]);
      }
    };
    fetchData();
  }, []);

  const handleCloseResults = () => {
    setResults([]); // Example function to close/hide the results
  };

  if (data.length === 0) {
    return <div>No data to display</div>;
  }

  return (
    <>
      <div className="header-top">
        <img src={logo} alt="" className="logo" />
        <Search setResults={setResults} />
        <SearchResultList results={results} onClose={handleCloseResults} />
        <div className="portfolio-row">
          {data.map((user) => (
            <Link
              key={user.id}
              to={`/profiles/${user.id}`}
              className="profile-link"
              onClick={() => {
                localStorage.setItem("profileId", user.id);
              }}
            >
              <div className="profile-tag">
                <div className="image-tag">
                  <img src={user.imageURL} alt="" />
                </div>
                <div className="rating-tag">
                  <h3>{user.name}</h3>
                  <p>{user.rating}</p>
                </div>
                <div className="icon">
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
