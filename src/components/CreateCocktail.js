import React from "react";
import "./CreateCocktail.css";

function CreateCocktail() {
  return (
    <div className="create-cocktail">
      <h1>Add Cocktail</h1>
      <form className="cocktail-form">
        <label className="form-label" htmlFor="cocktail-name">
          Cocktail Name
        </label>
        <input
          className="form-input-field"
          type="text"
          id="cocktail-name"
          name="cocktail-name"
        ></input>
        <button type="submit"></button>
      </form>
    </div>
  );
}

export default CreateCocktail;
