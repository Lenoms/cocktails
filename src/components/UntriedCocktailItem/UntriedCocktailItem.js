import React, { useState } from "react";
import "./UntriedCocktailItem.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal/DeleteModal";
import Recipe from "../Recipe/Recipe";
import CocktailService from "../../services/cocktail.service";

function UntriedCocktailItem({ item, refreshList }) {
  const navigate = useNavigate();
  const [hideDeleteModal, setHideDeleteModal] = useState(true);
  const [hideRecipe, setHideRecipe] = useState(true);
  console.log(item);
  let cocktailName = item.cocktailName;
  const notes = item.cocktailNotes || item.versions?.[0]?.notes || "";
  const ingredients = item.ingredients || item.versions?.[0]?.ingredients || [];
  let ingredientsString = "";
  for (var i = 0; i < ingredients.length; i++) {
    ingredientsString += ingredients[i];
    if (i != ingredients.length - 1) {
      ingredientsString += ", ";
    }
  }
  const deleteCocktail = (e) => {
    CocktailService.deleteCocktail(cocktailName, "untried");
    setHideDeleteModal(true);
    refreshList();
  };
  const updateCocktail = () => {
    navigate("/cocktails/update", {
      state: { cocktailItem: item, tried: false },
    });
  };

  const openRecipe = () => {
    setHideRecipe(false);
  };

  const showDeleteModal = () => {
    setHideDeleteModal(false);
  };

  return (
    <div className="untried-cocktail-item-body">
      <div className="border-untried-left"></div>
      <div className="name-notes-and-ingredients">
        <h5 className="cocktail-untried-name">{cocktailName}</h5>
        <div className="cocktail-paragraph-info">{ingredientsString}</div>
        <div
          className="cocktail-paragraph-info"
          style={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            height: "20px",
          }}
        >
          {notes}
        </div>
      </div>
      <div className="untried-cocktail-item-buttons">
        <button
          className="untried-cocktail-item-action-button"
          onClick={openRecipe}
        >
          <NoteAltIcon style={{ color: "rgb(248, 128, 148)" }} />
        </button>
        <button
          className="untried-cocktail-item-action-button"
          onClick={showDeleteModal}
        >
          <DeleteIcon style={{ color: "rgb(248, 128, 148)" }} />
        </button>
      </div>
      {!hideRecipe && (
        <Recipe
          handleClose={() => setHideRecipe(true)}
          name={item.cocktailName}
          ingredients={ingredients}
          notes={notes}
          updateCocktail={updateCocktail}
        ></Recipe>
      )}
      {!hideDeleteModal && (
        <DeleteModal
          confirmDelete={deleteCocktail}
          handleCancel={() => setHideDeleteModal(true)}
          deleteString={cocktailName}
        />
      )}
    </div>
  );
}

export default UntriedCocktailItem;
