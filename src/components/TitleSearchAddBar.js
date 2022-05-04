import React from "react";
import AddButton from "../components/AddButton";
import "./TitleSearchAddBar.css";
import SearchIcon from "@mui/icons-material/Search";

function TitleSearchAddBar() {
  return (
    <div className="title-search-add">
      <h1 className="header-title">Cocktails</h1>
      <div className="search-add">
        <div className="search-bar">
          <div className="search-icon-box">
            <SearchIcon />
          </div>
          <input className="search-bar-input"></input>
        </div>
        <AddButton></AddButton>
      </div>
    </div>
  );
}

export default TitleSearchAddBar;
