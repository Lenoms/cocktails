import React from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import "./Footer.css";

function FilterButton({ setFilterOn }) {
  const navigate = useNavigate();
  const handleFilterToggle = (e) => {
    setFilterOn(e.target.checked);
  };
  return (
    <div className="filter-button-container">
      <button className="filter-button" onClick={() => navigate("/filter")}>
        <FilterAltIcon style={{ color: "black" }} />
      </button>
      <Switch onChange={handleFilterToggle} />
    </div>
  );
}

export default FilterButton;
