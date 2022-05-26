import React from "react";
import "./UntriedCocktailItem.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getDatabase, ref, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";

function UntriedCocktailItem({ item }) {
  const navigate = useNavigate();
  let cocktailName = item.cocktailName;
  let ingredientsString = "";
  for (var i = 0; i < item.ingredients?.length; i++) {
    ingredientsString += item.ingredients[i];
    if (i != item.ingredients.length - 1) {
      ingredientsString += ", ";
    }
  }
  const deleteCocktail = (e) => {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    const db = getDatabase();
    remove(ref(db, "cocktails/untried/" + cocktailName));
  };
  const updateCocktail = () => {
    navigate("/cocktails/update", {
      state: { cocktailItem: item, tried: false },
    });
  };
  return (
    <div className="untried-cocktail-item-body">
      <div className="border-left"></div>
      <div className="name-notes-and-ingredients">
        <h5 className="cocktail-untried-name">{cocktailName}</h5>
        <p className="cocktail-paragraph-info">{item.cocktailNotes}</p>
        <p className="cocktail-paragraph-info">{ingredientsString}</p>
      </div>
      <div className="untried-cocktail-item-buttons">
        <button className="update-button" onClick={updateCocktail}>
          <EditIcon style={{ color: "black" }} />
        </button>
        <button className="delete-button" onClick={deleteCocktail}>
          <DeleteIcon style={{ color: "black" }} />
        </button>
      </div>
    </div>
  );
}

export default UntriedCocktailItem;
