import React from "react";
import "./FilterList.css";
import DeleteIcon from "@mui/icons-material/Delete";
import CocktailService from "../../services/cocktail.service";

function UnownedIngredients({ unownedIngredients, refreshList }) {
  const deleteUnownedIngredient = (ingredient) => {
    console.log("called", ingredient);
    CocktailService.deleteUnownedIngredient(ingredient.ingredient);
    refreshList();
  };
  return (
    <div className="unowned-ingredients-list-container">
      {unownedIngredients.map((ingredient) => {
        return (
          <div className="unowned-ingredient-container">
            <div>{ingredient.ingredient}</div>
            <span onClick={() => deleteUnownedIngredient(ingredient)}>
              <DeleteIcon style={{ color: "black" }} />
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default UnownedIngredients;
