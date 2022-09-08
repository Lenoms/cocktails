import React from "react";
import "./CocktailUpsertForm.css";
import { useState } from "react";
import Ingredients from "../Ingredients/Ingredients";
import AddIcon from "@mui/icons-material/Add";
import TriedForm from "../TriedForm/TriedForm";

function CocktailUpsertForm({ addCocktail, defaultCocktailObject }) {
  const [tried, setTried] = useState(defaultCocktailObject?.tried);
  const [imgUrl, setImgUrl] = useState(
    defaultCocktailObject?.image ? defaultCocktailObject.image : null
  );
  const [ingredients, setIngredients] = useState(
    defaultCocktailObject?.ingredients ? defaultCocktailObject.ingredients : []
  );
  const [isUploading, setIsUploading] = useState(false);

  const default_grades = defaultCocktailObject?.tried
    ? [defaultCocktailObject.danielGrade, defaultCocktailObject.daniGrade]
    : null;

  const returnCocktailObject = (e) => {
    e.preventDefault();
    var name = document.getElementById("cocktail-name").value;
    if (!name) {
      showValidationError();
      return;
    }
    var daniel_grade;
    var dani_grade;
    if (tried) {
      daniel_grade = document.getElementById("daniel-grade").value;
      dani_grade = document.getElementById("dani-grade").value;
    } else {
      daniel_grade = null;
      dani_grade = null;
    }
    let newCocktail = {
      name: document.getElementById("cocktail-name").value,
      notes: document.getElementById("cocktail-notes").value,
      tried: tried,
      ingredients: ingredients,
      daniel_grade: daniel_grade,
      dani_grade: dani_grade,
      imgUrl: imgUrl,
    };
    addCocktail(newCocktail);
  };

  function checkboxClicked(e) {
    setTried(!tried);
  }

  function showValidationError() {
    document.getElementById("validation-message").removeAttribute("hidden");
  }

  return (
    <form className="cocktail-form" onSubmit={returnCocktailObject}>
      <h1>
        {defaultCocktailObject
          ? `Update ${defaultCocktailObject.cocktailName}`
          : `Add Cocktail`}
      </h1>
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
          defaultValue={defaultCocktailObject?.cocktailName}
        ></input>
        <p id="validation-message" hidden style={{ color: "red", margin: 0 }}>
          Cocktail name cannot be empty!
        </p>
      </div>
      <div className="tried-checkbox-container">
        <div className="form-label" htmlFor="tried">
          Tried?
        </div>
        <input
          type="checkbox"
          id="tried"
          onChange={checkboxClicked}
          className="checkbox"
          checked={tried}
        ></input>
      </div>
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
          defaultValue={defaultCocktailObject?.cocktailNotes}
        ></textarea>
      </div>

      <Ingredients ingredients={ingredients} setIngredients={setIngredients} />
      {tried && (
        <>
          <TriedForm
            setImgUrl={setImgUrl}
            imgUrl={imgUrl}
            setIsUploading={setIsUploading}
            defaultGrades={default_grades}
          ></TriedForm>
        </>
      )}

      {imgUrl && (
        <img className="create-update-image" src={imgUrl} alt="uploaded file" />
      )}

      <button disabled={isUploading} className="submit-button" type="submit">
        <AddIcon style={{ color: "white" }} />
      </button>
    </form>
  );
}

export default CocktailUpsertForm;
