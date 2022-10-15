import React from "react";
import "./Recipe.css";

function Recipe({ handleClose, name, ingredients, notes, updateCocktail }) {
  return (
    <div className="recipe-modal-container">
      <div className="recipe-modal-internal-container">
        <div className="recipe-modal-recipe-container">
          <h1 className="recipe-modal-name">{name}</h1>
          <hr></hr>
          <h3>Ingredients</h3>
          <ul className="recipe-modal-ingredients-list">
            {ingredients.map((ingredient) => {
              return <li>{ingredient}</li>;
            })}
          </ul>
          <h3>Notes</h3>
          <div className="recipe-modal-notes">{notes}</div>
        </div>

        <div className="recipe-modal-buttons-container">
          <button className="recipe-modal-button" onClick={handleClose}>
            Close
          </button>
          <button className="recipe-modal-button" onClick={updateCocktail}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
