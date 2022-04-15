import React from "react";
import "./Navbar.css";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import CocktailService from "../services/cocktail.service";

function Navbar() {
  const navigate = useNavigate();

  const clickHandler = () => {
    CocktailService.writeToDatabase("White Lady", "C");
  };

  return (
    <div className="nav-bar">
      <div className="nav-buttons">
        <button className="nav-button" onClick={() => navigate("/tried")}>
          <CheckCircleIcon />
        </button>
        <button className="nav-button" onClick={() => navigate("/untried")}>
          <ListAltIcon />
        </button>
        <button onClick={clickHandler}>test</button>
      </div>
    </div>
  );
}

export default Navbar;
