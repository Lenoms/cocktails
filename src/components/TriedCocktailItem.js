import React from "react";
import "./TriedCocktailItem.css";
import placeholder from "../placeholder.jpg";
import DeleteIcon from "@mui/icons-material/Delete";
import { getDatabase, ref, remove } from "firebase/database";

function TriedCocktailItem({ cocktailName, cocktailGrade }) {
  const deleteCocktail = () => {
    const db = getDatabase();
    remove(ref(db, "cocktails/" + cocktailName));
    console.log("cocktail deleted");
  };
  return (
    <div className="tried-cocktail-item-body">
      <h3 className="cocktail-name">{cocktailName}</h3>
      <h3>{cocktailGrade}</h3>
      <img id="cocktail-image" src={placeholder}></img>
      <button className="delete-button" onClick={deleteCocktail}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default TriedCocktailItem;
