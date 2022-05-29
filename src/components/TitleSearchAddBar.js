import React from "react";
import AddButton from "../components/AddButton";
import "./TitleSearchAddBar.css";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import { useState } from "react";

function TitleSearchAddBar({ searchSubmitted }) {
  const [isLow, setIsLow] = useState(true);
  function submitSearch(e) {
    e.preventDefault();
    let searchQuery = document.getElementById("search-bar-input").value;
    searchSubmitted(searchQuery);
  }

  const variants = {
    low: { y: 45 },
    high: { y: 0 },
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
        <img src={process.env.PUBLIC_URL + "/cocktail8.png"} />
      </motion.div>
      <div className="search-add">
        <div className="search-bar">
          <div className="search-icon-box" onClick={submitSearch}>
            <SearchIcon style={{ color: "white" }} />
          </div>
          <form
            onSubmit={submitSearch}
            style={{ width: "90%", height: "100%" }}
          >
            <input
              autoComplete="off"
              className="search-bar-input"
              id="search-bar-input"
            ></input>
          </form>
        </div>
        <AddButton></AddButton>
      </div>
    </div>
  );
}

export default TitleSearchAddBar;
