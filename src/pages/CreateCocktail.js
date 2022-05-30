import React from "react";
import "./CreateCocktail.css";
import CocktailService from "../services/cocktail.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { RouteAnimation } from "../animations/RouteAnimation";
import UploadForm from "../components/UploadForm/UploadForm";
import "./CreateUpdate.css";
import Ingredients from "../components/Ingredients/Ingredients";
import AddIcon from "@mui/icons-material/Add";

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
        var daniel_grade = document.getElementById("daniel-grade").value;
        var dani_grade = document.getElementById("dani-grade").value;
        CocktailService.writeTriedToDatabase(
          name,
          daniel_grade,
          dani_grade,
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
      <form className="cocktail-form" onSubmit={addCocktail}>
        <h1>Add Cocktail</h1>
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
        <label className="form-label" htmlFor="tried">
          Tried?
        </label>
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

        <Ingredients
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
        {tried && (
          <>
            <UploadForm
              uploadImage={uploadImage}
              imgUrl={imgUrl}
              progresspercent={progresspercent}
            ></UploadForm>
          </>
        )}

        {imgUrl && (
          <img
            className="create-update-image"
            src={imgUrl}
            alt="uploaded file"
          />
        )}

        <button
          disabled={progresspercent != 0 && !imgUrl}
          className="submit-button"
          type="submit"
        >
          <AddIcon style={{ color: "white" }} />
        </button>
      </form>
    </motion.div>
  );
}

export default CreateCocktail;
