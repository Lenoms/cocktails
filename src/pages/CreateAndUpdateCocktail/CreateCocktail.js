import React from "react";
import "./CreateCocktail.css";
import CocktailService from "../../services/cocktail.service";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RouteAnimation } from "../../animations/RouteAnimation";
import "./CreateUpdate.css";
import CocktailUpsertForm from "../../components/CocktailUpsertForm/CocktailUpsertForm";

function CreateCocktail() {
  const navigate = useNavigate();

  function addCocktail(cocktailObject) {
    if (cocktailObject.tried) {
      CocktailService.writeTriedToDatabase(
        cocktailObject.name,
        cocktailObject.daniel_grade,
        cocktailObject.dani_grade,
        cocktailObject.notes,
        cocktailObject.ingredients,
        cocktailObject.imgUrl,
        null
      );
      navigate("/cocktails/tried");
    } else {
      CocktailService.writeUntriedToDatabase(
        cocktailObject.name,
        cocktailObject.notes,
        cocktailObject.ingredients
      );
      navigate("/cocktails/untried");
    }
  }

  return (
    <motion.div
      className="create-cocktail"
      initial={RouteAnimation.initial}
      animate={RouteAnimation.animate}
      exit={RouteAnimation.exit}
    >
      <CocktailUpsertForm addCocktail={addCocktail} />
    </motion.div>
  );
}

export default CreateCocktail;
