import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import "./Ingredients.css";
import {
  AMOUNTS,
  MEASURES,
  PLACEHOLDERS,
  MEASURE_TOP_WITH_RAW,
  MEASURE_TOP_WITH_DISPLAY,
  ICON_COLOR,
} from "./Ingredients.constants";

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
    const measureForIngredient =
      newMeasure === MEASURE_TOP_WITH_RAW
        ? MEASURE_TOP_WITH_DISPLAY
        : newMeasure;

    const ingredient = `${newAmount} ${measureForIngredient} ${newIngredientName}`;
    setIngredients([...ingredients, ingredient]);
    setNewIngredientName("");
    setNewAmount("");
    setNewMeasure("");
  }

  function deleteIngredient(ingredient) {
    setIngredients(
      ingredients.filter((eachIngredient) => eachIngredient !== ingredient),
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
          defaultValue={PLACEHOLDERS.AMOUNT}
          value={newAmount}
          onChange={handleAmountChange}
        >
          <option value="" hidden disabled>
            {PLACEHOLDERS.AMOUNT}
          </option>
          {AMOUNTS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <select
          defaultValue={PLACEHOLDERS.MEASURE}
          value={newMeasure}
          onChange={handleMeasureChange}
        >
          <option value="" hidden disabled>
            {PLACEHOLDERS.MEASURE}
          </option>
          {MEASURES.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <button className="add-ingredient-button" onClick={addIngredient}>
          <AddIcon fontSize="large" style={{ color: ICON_COLOR }} />
        </button>
      </div>
      <div>
        {ingredients.map(function (ingredient) {
          return (
            <div key={ingredient}>
              <li className="ingredients-list-item">
                <div className="ingredients-list-item-name">{ingredient}</div>
                <span onClick={() => deleteIngredient(ingredient)}>
                  <DeleteIcon style={{ color: ICON_COLOR }} />
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
