import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { getDatabase, ref as databaseRef, remove } from "firebase/database";
import CocktailService from "../services/cocktail.service";
import { useNavigate } from "react-router-dom";
import UploadForm from "../components/UploadForm";
import "./UpdateCocktailInfo.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import "./CreateUpdate.css";

function UpdateCocktailInfo({ location }) {
  if (!!location.state) {
    let navigate = useNavigate();
    let cocktail = location.state.cocktailItem;
    const [progresspercent, setProgresspercent] = useState(0);

    // Setting up imgUrl
    let defaultImgUrl = cocktail.image ? cocktail.image : null;
    const [imgUrl, setImgUrl] = useState(defaultImgUrl);

    // Setting up tried
    let defaultTried = location.state.tried;
    const [tried, setTried] = useState(defaultTried);

    // Setting up ingredients
    let defaultIngredients = cocktail.ingredients ? cocktail.ingredients : [];
    const [ingredients, setIngredients] = useState(defaultIngredients);

    function updateCocktail(e) {
      e.preventDefault();

      // Get new values
      var newName = document.getElementById("cocktail-name").value;
      var notes = document.getElementById("cocktail-notes").value;

      const db = getDatabase();
      if (newName.length != 0) {
        if (defaultTried) {
          remove(databaseRef(db, "cocktails/tried/" + cocktail.cocktailName));
        } else {
          remove(databaseRef(db, "cocktails/untried/" + cocktail.cocktailName));
        }
        if (tried) {
          var grade = document.getElementById("cocktail-grade").value;
          CocktailService.writeTriedToDatabase(
            newName,
            grade,
            notes,
            ingredients,
            imgUrl
          );
          navigate("/cocktails/tried");
        } else {
          CocktailService.writeUntriedToDatabase(newName, notes, ingredients);
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
        <h1>Update {cocktail.cocktailName}</h1>
        <form className="cocktail-form" onSubmit={updateCocktail}>
          <div className="form-input-field-container">
            <label className="form-label" htmlFor="cocktail-name">
              Cocktail Name
            </label>
            <input
              className="form-input-field"
              type="text"
              id="cocktail-name"
              name="cocktail-name"
              defaultValue={cocktail.cocktailName}
              autoComplete="off"
            ></input>
            <p
              id="validation-message"
              hidden
              style={{ color: "red", margin: 0 }}
            >
              Cocktail name cannot be empty!
            </p>
          </div>
          <label htmlFor="tried">Tried?</label>
          <input
            type="checkbox"
            id="tried"
            onChange={checkboxClicked}
            className="checkbox"
            checked={tried}
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
              defaultValue={cocktail.cocktailNotes}
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
          {imgUrl && <img src={imgUrl} alt="uploaded file" />}

          <button
            disabled={progresspercent != 0 && !imgUrl}
            className="submit-button"
            type="submit"
          >
            Update
          </button>
        </form>
      </motion.div>
    );
  }
}

export default UpdateCocktailInfo;
