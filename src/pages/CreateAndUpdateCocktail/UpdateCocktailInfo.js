import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { getDatabase, ref as databaseRef, remove } from "firebase/database";
import CocktailService from "../../services/cocktail.service";
import { useNavigate } from "react-router-dom";
import "./CreateUpdate.css";
import "./UpdateCocktailInfo.css";
import CocktailUpsertForm from "../../components/CocktailUpsertForm/CocktailUpsertForm";

function UpdateCocktailInfo({ location }) {
  const navigate = useNavigate();

  const defaultCocktail = useMemo(() => {
    return {
      ...location.state.cocktailItem,
      tried: location.state.tried,
    };
  }, [location.state]);

  if (!location.state) {
    return <p>Loading...</p>; // or null
  }

  async function updateCocktail(cocktailObject) {
    await CocktailService.saveCocktail({
      cocktailId: defaultCocktail.cocktailId,
      isTried: cocktailObject.tried,
      name: cocktailObject.name,
      danielGrade: cocktailObject.danielGrade ?? null,
      daniGrade: cocktailObject.daniGrade ?? null,
      versions: cocktailObject.versions,
      tags: cocktailObject.tags ?? [],
      createdAt: defaultCocktail.tried ? defaultCocktail.createdAt : null,
    });
    navigate(cocktailObject.tried ? "/tried" : "/untried");
  }

  return (
    <motion.div
      className="update-cocktail"
      initial={{
        opacity: 0,
        x: "-200vw",
        transition: { ease: "easeInOut", duration: 0.5 },
      }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
      exit={{
        opacity: 0,
        x: "-200vw",
        transition: { ease: "easeInOut", duration: 0.5 },
      }}
    >
      <CocktailUpsertForm
        addCocktail={updateCocktail}
        defaultCocktailObject={defaultCocktail}
      />
    </motion.div>
  );
}

export default UpdateCocktailInfo;
