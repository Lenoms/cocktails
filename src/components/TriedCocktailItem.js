import React from "react";
import "./TriedCocktailItem.css";
import placeholder from "../placeholder.jpg";
import DeleteIcon from "@mui/icons-material/Delete";
import { getDatabase, ref, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";

function TriedCocktailItem({
  cocktailName,
  cocktailGrade,
  cocktailImageUrl = placeholder,
}) {
  const navigate = useNavigate();
  const deleteCocktail = () => {
    const db = getDatabase();
    remove(ref(db, "cocktails/" + cocktailName));
    console.log("cocktail deleted");
  };

  const cocktailClicked = () => {
    console.log("Cocktail clicked");
    navigate("/cocktails/info");
  };
  return (
    <div className="tried-cocktail-item-body" onClick={cocktailClicked}>
      <h3 className="cocktail-name">{cocktailName}</h3>
      <h3>{cocktailGrade}</h3>
      <img id="cocktail-image" src={cocktailImageUrl}></img>
      <button className="delete-button" onClick={deleteCocktail}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default TriedCocktailItem;
