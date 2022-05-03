import React from "react";
import "./CreateCocktail.css";
import CocktailService from "../services/cocktail.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { RouteAnimation } from "../animations/RouteAnimation";
import UploadForm from "../components/UploadForm";

function CreateCocktail() {
  const navigate = useNavigate();
  const [progresspercent, setProgresspercent] = useState(0);
  const [imgUrl, setImgUrl] = useState(null);
  const [tried, setTried] = useState(false);

  function addCocktail() {
    var name = document.getElementById("cocktail-name").value;
    if (name) {
      if (tried) {
        var grade = document.getElementById("cocktail-grade").value;
        var notes = document.getElementById("cocktail-notes").value;
        CocktailService.writeTriedToDatabase(name, grade, notes, imgUrl);
        navigate("/cocktails/tried");
      } else {
        CocktailService.writeUntriedToDatabase(name);
        navigate("/cocktails/untried");
      }
    }
  }

  function uploadImage(event) {
    CocktailService.uploadImage(event, setProgresspercent, setImgUrl);
  }

  function checkboxClicked(e) {
    setTried(!tried);
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
          ></input>
        </div>
        <label htmlFor="tried">Tried?</label>
        <input
          type="checkbox"
          id="tried"
          onChange={checkboxClicked}
          className="checkbox"
        ></input>
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
