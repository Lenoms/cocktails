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
    const [imgUrl, setImgUrl] = useState(null);

    function updateCocktail() {
      var grade = document.getElementById("cocktail-grade").value;
      var notes = document.getElementById("cocktail-notes").value;
      var name = cocktail.cocktailName;
      CocktailService.writeTriedToDatabase(name, grade, notes, imgUrl);
      const db = getDatabase();
      remove(databaseRef(db, "cocktails/untried/" + name));
      navigate("/cocktails/tried");
    }
    function uploadImage(event) {
      CocktailService.uploadImage(event, setProgresspercent, setImgUrl);
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
          <UploadForm
            uploadImage={uploadImage}
            imgUrl={imgUrl}
            progresspercent={progresspercent}
          ></UploadForm>

          <button disabled={!imgUrl} className="submit-button" type="submit">
            Update
          </button>
        </form>
        {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}
      </motion.div>
    );
  }
}

export default UpdateCocktailInfo;
