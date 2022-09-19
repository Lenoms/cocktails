import React from "react";
import "./FilterList.css";

function UnownedIngredients({ unownedIngredients }) {
  return (
    <div className="unowned-ingredients-list-container">
      <ul>
        {unownedIngredients.map((ingredient) => {
          return <li key={ingredient.ingredient}>{ingredient.ingredient}</li>;
        })}
      </ul>
    </div>
  );
}

export default UnownedIngredients;
