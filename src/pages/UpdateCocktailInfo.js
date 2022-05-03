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
        CocktailService.writeTriedToDatabase(name, grade, notes, imgUrl);
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
          {tried && (
            <>
              <UploadForm
                uploadImage={uploadImage}
                imgUrl={imgUrl}
                progresspercent={progresspercent}
                cocktail={cocktail}
              ></UploadForm>
            </>
          )}
          {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}

          <button className="submit-button" type="submit">
            Update
          </button>
        </form>
      </motion.div>
    );
  }
}

export default UpdateCocktailInfo;
