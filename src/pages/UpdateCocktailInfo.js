import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { getDatabase, ref as databaseRef, remove } from "firebase/database";
import CocktailService from "../services/cocktail.service";
import { useNavigate } from "react-router-dom";
import UploadForm from "../components/UploadForm";

function UpdateCocktailInfo({ location }) {
  if (!!location.state) {
    let navigate = useNavigate();
    let cocktail = location.state.cocktailItem;
    const [progresspercent, setProgresspercent] = useState(0);
    let defaultImgUrl = null;
    if (cocktail.image) {
      defaultImgUrl = cocktail.image;
    }
    const [imgUrl, setImgUrl] = useState(defaultImgUrl);
    let defaultTried = location.state.tried;
    const [tried, setTried] = useState(defaultTried);
    let defaultIngredients = [];
    if (cocktail.ingredients) {
      defaultIngredients = cocktail.ingredients;
    }
    const [ingredients, setIngredients] = useState(defaultIngredients);

    function updateCocktail() {
      var grade = document.getElementById("cocktail-grade").value;
      var notes = document.getElementById("cocktail-notes").value;
      var name = cocktail.cocktailName;
      const db = getDatabase();
      if (defaultTried) {
        remove(databaseRef(db, "cocktails/tried/" + name));
      } else {
        remove(databaseRef(db, "cocktails/untried/" + name));
      }
      if (tried) {
        CocktailService.writeTriedToDatabase(
          name,
          grade,
          notes,
          ingredients,
          imgUrl
        );
      } else {
        CocktailService.writeUntriedToDatabase(name);
      }
      navigate("/cocktails/tried");
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
    return (
      <motion.div
        className="create-cocktail"
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
            ></input>
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
              <button onClick={addIngredient}>Add Ingredient</button>
            </div>
            <ul>
              {ingredients.map(function (ingredient) {
                return (
                  <div className="ingredients-list-item" key={ingredient}>
                    <li>
                      {ingredient}
                      <span onClick={() => deleteIngredient(ingredient)}>
                        Delete
                      </span>
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
          {tried && (
            <>
              <UploadForm
                uploadImage={uploadImage}
                imgUrl={imgUrl}
                progresspercent={progresspercent}
                setIngredients={setIngredients}
                ingredients={ingredients}
                cocktail={cocktail}
              ></UploadForm>
            </>
          )}
          {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}

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
