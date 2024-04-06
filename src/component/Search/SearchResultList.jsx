import React, { useEffect, useRef } from "react";
import "./SearchResultList.css";
import { Link } from "react-router-dom";

const SearchResultList = ({ results, onClose }) => {
  const listRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div ref={listRef} className="result-list">
      {results.map((result, id) => {
        return (
          <div key={id}>
            <Link
              to={`/profiles/${result.id}`}
              className="name-div"
              onClick={() => {
                localStorage.setItem("profileId", result.id);
              }}
            >
              {result.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResultList;
