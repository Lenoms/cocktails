import React from "react";
import AddButton from "../AddButton/AddButton";
import "./TitleSearchAddBar.css";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { motion } from "framer-motion";
import { useState } from "react";

function TitleSearchAddBar({ searchSubmitted }) {
  const [isLow, setIsLow] = useState(true);
  function submitSearch(e) {
    e.preventDefault();
    let searchQuery = document.getElementById("search-bar-input").value;
    searchSubmitted(searchQuery);
  }

  function clearSearchBar() {
    document.getElementById("search-bar-input").value = "";
    searchSubmitted("");
  }

  const variants = {
    low: { y: 40 },
    high: { y: 10 },
  };
  return (
    <div className="title-search-add">
      <motion.div
        className="image-container"
        animate={isLow ? "low" : "high"}
        variants={variants}
        transition={{ type: "spring" }}
        onClick={() => setIsLow(!isLow)}
      >
        {" "}
        <img src={process.env.PUBLIC_URL + "/cocktail-header.png"} />
      </motion.div>
      <div className="search-add">
        <div className="search-bar">
          <div className="search-icon-box" onClick={submitSearch}>
            <SearchIcon style={{ color: "white" }} />
          </div>
          <form
            onSubmit={submitSearch}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              autoComplete="off"
              className="search-bar-input"
              id="search-bar-input"
            ></input>
            {document.getElementById("search-bar-input") &&
              document.getElementById("search-bar-input").value != "" && (
                <div className="search-clear-icon" onClick={clearSearchBar}>
                  <ClearIcon style={{ color: "rgb(248, 128, 148)" }} />
                </div>
              )}
          </form>
        </div>
        <AddButton></AddButton>
      </div>
    </div>
  );
}

export default TitleSearchAddBar;
