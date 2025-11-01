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

  function updateCocktail(cocktailObject) {
    const date = defaultCocktail.date;

    if (location.state.tried) {
      CocktailService.deleteCocktail(defaultCocktail.cocktailName, "tried");
    } else {
      CocktailService.deleteCocktail(defaultCocktail.cocktailName, "untried");
    }

    if (cocktailObject.tried) {
      CocktailService.writeTriedToDatabase(
        cocktailObject.name,
        cocktailObject.daniel_grade,
        cocktailObject.dani_grade,
        cocktailObject.versions,
        date,
        cocktailObject.tags
      );
      navigate("/tried");
    } else {
      CocktailService.writeUntriedToDatabase(
        cocktailObject.name,
        cocktailObject.versions
      );
      navigate("/untried");
    }
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
