import React, { useState } from "react";
import "./UntriedCocktailItem.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getDatabase, ref, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal/DeleteModal";
import CocktailService from "../../services/cocktail.service";

function UntriedCocktailItem({ item, refreshList }) {
  const navigate = useNavigate();
  const [hideDeleteModal, setHideDeleteModal] = useState(true);
  let cocktailName = item.cocktailName;
  let ingredientsString = "";
  for (var i = 0; i < item.ingredients?.length; i++) {
    ingredientsString += item.ingredients[i];
    if (i != item.ingredients.length - 1) {
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
          {item.cocktailNotes}
        </div>
      </div>
      <div className="untried-cocktail-item-buttons">
        <button className="update-button" onClick={updateCocktail}>
          <EditIcon style={{ color: "rgb(248, 128, 148)" }} />
        </button>
        <button className="delete-button" onClick={showDeleteModal}>
          <DeleteIcon style={{ color: "rgb(248, 128, 148)" }} />
        </button>
      </div>
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
