import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import "./Ingredients.css";

function Ingredients({ ingredients, setIngredients }) {
  const [newIngredientName, setNewIngredientName] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newMeasure, setNewMeasure] = useState("");
  const handleNewIngredientNameChange = (event) => {
    setNewIngredientName(event.target.value);
  };
  const handleAmountChange = (event) => {
    setNewAmount(event.target.value);
  };
  const handleMeasureChange = (event) => {
    setNewMeasure(event.target.value);
  };
  function addIngredient(e) {
    e.preventDefault();

    if (newMeasure === "top with") {
      setNewMeasure("Top with");
    }
    let ingredient = `${newAmount} ${newMeasure} ${newIngredientName}`;
    setIngredients([...ingredients, ingredient]);
    setNewIngredientName("");
    setNewAmount("");
    setNewMeasure("");
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
          value={newIngredientName}
          onChange={handleNewIngredientNameChange}
        ></input>
        <select
          defaultValue={"Amount"}
          value={newAmount}
          id="ingredients-measure-dropdown-amount"
          onChange={handleAmountChange}
        >
          <option value="" hidden disabled>
            Amount
          </option>
          <option>¼</option>
          <option>½</option>
          <option>¾</option>
          <option>1</option>
          <option>1½</option>
          <option>2</option>
          <option>2½</option>
          <option>3</option>
        </select>
        <select
          defaultValue={"Measure"}
          value={newMeasure}
          id="ingredients-measure-dropdown-measure"
          onChange={handleMeasureChange}
        >
          <option value="" hidden disabled>
            Measure
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
