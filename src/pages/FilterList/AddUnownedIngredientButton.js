import React from "react";
import CocktailService from "../../services/cocktail.service";
import AddIcon from "@mui/icons-material/Add";
import "./FilterList.css";

function AddUnownedIngredientButton({ setLoading, refreshList }) {
  const addUnownedIngredient = () => {
    setLoading(true);
    let ingredient = document.getElementById(
      "filter-list-ingredient-input"
    ).value;
    CocktailService.addUnownedIngredient(ingredient);
    document.getElementById("filter-list-ingredient-input").value = "";
    refreshList();
  };
  return (
    <div className="add-unowned-ingredient-container">
      <input id="filter-list-ingredient-input"></input>
      <button
        className="filter-list-add-ingredient-button"
        onClick={addUnownedIngredient}
      >
        <AddIcon style={{ color: "white" }} />
      </button>
    </div>
  );
}

export default AddUnownedIngredientButton;
