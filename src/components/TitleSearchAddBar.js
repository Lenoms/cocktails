import React from "react";
import AddButton from "../components/AddButton";
import "./TitleSearchAddBar.css";
import SearchIcon from "@mui/icons-material/Search";

function TitleSearchAddBar() {
  function submitSearch(e) {
    e.preventDefault();
    let searchQuery = document.getElementById("search-bar-input").value;
    console.log(searchQuery);
  }
  return (
    <div className="title-search-add">
      <div className="image-container">
        {" "}
        <img src={process.env.PUBLIC_URL + "/cocktail.png"} />
      </div>
      <div className="search-add">
        <div className="search-bar">
          <div className="search-icon-box" onClick={submitSearch}>
            <SearchIcon />
          </div>
          <form
            onSubmit={submitSearch}
            style={{ width: "90%", height: "100%" }}
          >
            <input className="search-bar-input" id="search-bar-input"></input>
          </form>
        </div>
        <AddButton></AddButton>
      </div>
    </div>
  );
}

export default TitleSearchAddBar;
