import React from "react";
import "./CreateCocktail.css";
import CocktailService from "../services/cocktail.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { RouteAnimation } from "../animations/RouteAnimation";
import UploadForm from "../components/UploadForm";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import "./CreateUpdate.css";

function CreateCocktail() {
  const navigate = useNavigate();
  const [progresspercent, setProgresspercent] = useState(0);
  const [imgUrl, setImgUrl] = useState(null);
  const [tried, setTried] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  function addCocktail(e) {
    e.preventDefault();
    var name = document.getElementById("cocktail-name").value;
    var notes = document.getElementById("cocktail-notes").value;
    if (name) {
      if (tried) {
        var grade = document.getElementById("cocktail-grade").value;
        CocktailService.writeTriedToDatabase(
          name,
          grade,
          notes,
          ingredients,
          imgUrl
        );
        navigate("/cocktails/tried");
      } else {
        CocktailService.writeUntriedToDatabase(name, notes, ingredients);
        navigate("/cocktails/untried");
      }
    } else {
      showValidationError();
    }
  }

  function uploadImage(event) {
    CocktailService.uploadImage(event, setProgresspercent, setImgUrl);
  }

  function checkboxClicked(e) {
    setTried(!tried);
  }

  function addIngredient(e) {
    e.preventDefault();
    let ingredient = document.getElementById("cocktail-ingredients").value;
    setIngredients([...ingredients, ingredient]);
    document.getElementById("cocktail-ingredients").value = "";
  }
  function deleteIngredient(ingredient) {
    setIngredients(
      ingredients.filter((eachIngredient) => eachIngredient !== ingredient)
    );
  }

  function showValidationError() {
    document.getElementById("validation-message").removeAttribute("hidden");
    console.log("Called!");
  }

  return (
    <motion.div
      className="create-cocktail"
      initial={RouteAnimation.initial}
      animate={RouteAnimation.animate}
      exit={RouteAnimation.exit}
    >
      <h1>Add Cocktail</h1>
      <form className="cocktail-form" onSubmit={addCocktail}>
        <div className="form-input-field-container">
          <label className="form-label" htmlFor="cocktail-name">
            Cocktail Name
          </label>
          <input
            className="form-input-field"
            type="text"
            id="cocktail-name"
            name="cocktail-name"
            autoComplete="off"
          ></input>
          <p id="validation-message" hidden style={{ color: "red", margin: 0 }}>
            Cocktail name cannot be empty!
          </p>
        </div>
        <label htmlFor="tried">Tried?</label>
        <input
          type="checkbox"
          id="tried"
          onChange={checkboxClicked}
          className="checkbox"
        ></input>
        <div className="form-input-field-container">
          <label className="form-label" htmlFor="cocktail-notes">
            Notes:
          </label>
          <textarea
            className="notes-field"
            rows={4}
            type="text"
            id="cocktail-notes"
            name="cocktail-notes"
          ></textarea>
        </div>

        <div className="form-input-field-container">
          <label className="form-label" htmlFor="cocktail-ingredients">
            Ingredients
          </label>
          <div className="add-ingredients">
            <input
              type="text"
              name="cocktail-ingredients"
              id="cocktail-ingredients"
            ></input>
            <button className="add-ingredient-button" onClick={addIngredient}>
              <AddIcon fontSize="large" />
            </button>
          </div>
          <div>
            {ingredients.map(function (ingredient) {
              return (
                <div key={ingredient}>
                  <li className="ingredients-list-item">
                    <div className="ingredients-list-item-name">
                      {ingredient}
                    </div>
                    <span onClick={() => deleteIngredient(ingredient)}>
                      <DeleteIcon />
                    </span>
                  </li>
                </div>
              );
            })}
          </div>
        </div>
        {tried && (
          <>
            <UploadForm
              uploadImage={uploadImage}
              imgUrl={imgUrl}
              progresspercent={progresspercent}
            ></UploadForm>
          </>
        )}

        {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}

        <button
          disabled={progresspercent != 0 && !imgUrl}
          className="submit-button"
          type="submit"
        >
          Add
        </button>
      </form>
    </motion.div>
  );
}

export default CreateCocktail;
