import React from "react";
import "./TriedCocktailItem.css";
import placeholder from "../placeholder.jpg";

function TriedCocktailItem({ cocktailName, cocktailGrade }) {
  return (
    <div className="tried-cocktail-item-body">
      <h3>{cocktailName}</h3>
      <h3>{cocktailGrade}</h3>
      <img id="cocktail-image" src={placeholder}></img>
    </div>
  );
}

export default TriedCocktailItem;
