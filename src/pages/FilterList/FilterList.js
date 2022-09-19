import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RouteAnimation } from "../../animations/RouteAnimation";
import CocktailService from "../../services/cocktail.service";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "./FilterList.css";
import AddUnownedIngredientButton from "./AddUnownedIngredientButton";
import UnownedIngredients from "./UnownedIngredients";

function FilterList() {
  const [unownedIngredients, setUnownedIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    CocktailService.getUnownedIngredients().then((data) => {
      setUnownedIngredients(Object.values(data));
      setLoading(false);
    });
  }, []);

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
        className="filter-list-container"
      >
        <h1>Unowned Ingredients</h1>
        <UnownedIngredients unownedIngredients={unownedIngredients} />
        <AddUnownedIngredientButton
          setLoading={setLoading}
          refreshList={refreshList}
        />
      </motion.div>
    );
  }
}

export default FilterList;
