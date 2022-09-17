import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RouteAnimation } from "../../animations/RouteAnimation";
import CocktailService from "../../services/cocktail.service";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function FilterList() {
  const [unownedIngredients, setUnownedIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    CocktailService.getUnownedIngredients().then((data) => {
      setUnownedIngredients(Object.values(data));
      setLoading(false);
      console.log(Object.values(data));
    });
  }, []);

  const addUnownedIngredient = () => {
    setLoading(true);
    let ingredient = document.getElementById(
      "filter-list-ingredient-input"
    ).value;
    CocktailService.addUnownedIngredient(ingredient);
    document.getElementById("filter-list-ingredient-input").value = "";
    refreshList();
  };

  const refreshList = () => {
    CocktailService.getUnownedIngredients().then((data) => {
      setUnownedIngredients(Object.values(data));
      setLoading(false);
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  } else {
    return (
      <motion.div
        initial={RouteAnimation.infoInitial}
        animate={RouteAnimation.animate}
        exit={RouteAnimation.infoExit}
      >
        FilterList
        {unownedIngredients.map((ingredient) => {
          return <div key={ingredient.ingredient}>{ingredient.ingredient}</div>;
        })}
        <input id="filter-list-ingredient-input"></input>
        <button onClick={addUnownedIngredient}></button>
      </motion.div>
    );
  }
}

export default FilterList;
