import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ScaleIcon from "@mui/icons-material/Scale";
import "./Ingredients.css";

function Ingredients({ ingredients, setIngredients }) {
  function addIngredient(e) {
    e.preventDefault();
    let ingredientName = document.getElementById("cocktail-ingredients").value;
    let amount = document.getElementById(
      "ingredients-measure-dropdown-amount"
    ).value;
    let measure = document.getElementById(
      "ingredients-measure-dropdown-measure"
    ).value;

    if (amount === "Amount") {
      amount = "";
    }
    if (measure === "Measure") {
      measure = "";
    }
    if (measure === "top with") {
      measure = "Top with";
    }
    let ingredient = `${amount} ${measure} ${ingredientName}`;
    setIngredients([...ingredients, ingredient]);
    document.getElementById("cocktail-ingredients").value = "";
    document.getElementById("ingredients-measure-dropdown-amount").value =
      "Amount";
    document.getElementById("ingredients-measure-dropdown-measure").value =
      "Measure";
  }

  function deleteIngredient(ingredient) {
    setIngredients(
      ingredients.filter((eachIngredient) => eachIngredient !== ingredient)
    );
  }
  return (
    <div className="form-input-field-container">
      <label className="form-label" htmlFor="cocktail-ingredients">
        Ingredients
      </label>
      <div className="add-ingredients">
        <input
          type="text"
          name="cocktail-ingredients"
          className="add-ingredients-input"
          id="cocktail-ingredients"
        ></input>
        <select
          className="ingredients-measure-dropdown"
          defaultValue={"Amount"}
          id="ingredients-measure-dropdown-amount"
        >
          <option hidden disabled>
            Amount
          </option>
          <option>¼</option>
          <option>½</option>
          <option>¾</option>
          <option>1</option>
          <option>1½</option>
          <option>2</option>
          <option>3</option>
        </select>
        <select
          className="ingredients-measure-dropdown"
          defaultValue={"Measure"}
          id="ingredients-measure-dropdown-measure"
        >
          <option hidden disabled>
            Measure
            <ScaleIcon />
          </option>
          <option>oz</option>
          <option>dash</option>
          <option>cup</option>
          <option>teaspoon</option>
          <option>tablespoon</option>
          <option>unit</option>
          <option>top with</option>
          <option>scoop</option>
          <option>slice</option>
        </select>
        <button className="add-ingredient-button" onClick={addIngredient}>
          <AddIcon fontSize="large" style={{ color: "black" }} />
        </button>
      </div>
      <div>
        {ingredients.map(function (ingredient) {
          return (
            <div key={ingredient}>
              <li className="ingredients-list-item">
                <div className="ingredients-list-item-name">{ingredient}</div>
                <span onClick={() => deleteIngredient(ingredient)}>
                  <DeleteIcon style={{ color: "black" }} />
                </span>
              </li>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Ingredients;
