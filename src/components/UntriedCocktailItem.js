import React from "react";
import "./UntriedCocktailItem.css";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getDatabase, ref, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";

function UntriedCocktailItem({ item }) {
  const navigate = useNavigate();
  let cocktailName = item.cocktailName;
  const deleteCocktail = (e) => {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    const db = getDatabase();
    remove(ref(db, "cocktails/untried/" + cocktailName));
  };
  const triedCocktail = () => {
    navigate("/cocktails/update", {
      state: { cocktailItem: item, tried: false },
    });
  };
  return (
    <div className="untried-cocktail-item-body">
      <h3>{cocktailName}</h3>
      <div className="untried-cocktail-item-buttons">
        <button className="tried-button" onClick={triedCocktail}>
          <CheckCircleIcon />
        </button>
        <button className="delete-button" onClick={deleteCocktail}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

export default UntriedCocktailItem;
