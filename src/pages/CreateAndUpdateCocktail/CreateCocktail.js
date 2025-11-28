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

  async function addCocktail(cocktailObject) {
    await CocktailService.saveCocktail({
      isTried: cocktailObject.tried,
      name: cocktailObject.name,
      danielGrade: cocktailObject.danielGrade ?? null,
      daniGrade: cocktailObject.daniGrade ?? null,
      versions: cocktailObject.versions,
      tags: cocktailObject.tags ?? [],
    });
    navigate(cocktailObject.tried ? "/tried" : "/untried");
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
