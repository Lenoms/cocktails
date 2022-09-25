import React from "react";
import "./FilterList.css";

function UnownedIngredients({ unownedIngredients }) {
  const UnownedIngredient = (ingredient) => {
    return (
      <div className="unowned-ingredient-container">
        {ingredient.ingredient}
      </div>
    );
  };
  const BarRow = (row) => {
    return (
      <div className="unowned-ingredients-bar-row">
        {row.row.map((ingredient) => {
          return <UnownedIngredient ingredient={ingredient.ingredient} />;
        })}
      </div>
    );
  };
  const BarRows = () => {
    let rows = splitArrayIntoChunksOfLen(unownedIngredients, 3);
    return rows.map((row) => {
      return <BarRow row={row} />;
    });
  };

  function splitArrayIntoChunksOfLen(arr, len) {
    var chunks = [],
      i = 0,
      n = arr.length;
    while (i < n) {
      chunks.push(arr.slice(i, (i += len)));
    }
    return chunks;
  }
  return (
    <div className="unowned-ingredients-list-container">
      <BarRows />
    </div>
  );
}

export default UnownedIngredients;
