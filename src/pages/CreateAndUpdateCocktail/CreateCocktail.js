import React from "react";
import "./CreateCocktail.css";
import CocktailService from "../../services/cocktail.service";
import { useNavigate } from "react-router-dom";
import RouteWrapper from "../../components/RouteWrapper/RouteWrapper";
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
    <RouteWrapper className="create-cocktail">
      <CocktailUpsertForm addCocktail={addCocktail} />
    </RouteWrapper>
  );
}

export default CreateCocktail;
