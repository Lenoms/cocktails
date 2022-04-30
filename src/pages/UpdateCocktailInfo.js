import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { getDatabase, ref as databaseRef, remove } from "firebase/database";
import CocktailService from "../services/cocktail.service";
import { useNavigate } from "react-router-dom";

function UpdateCocktailInfo({ location }) {
  if (!!location.state) {
    let navigate = useNavigate();
    let cocktail = location.state.cocktailItem;
    const [progresspercent, setProgresspercent] = useState(0);
    const [imgUrl, setImgUrl] = useState(null);
    const storage = getStorage();

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
      const storageRef = ref(storage, `images/${event.target.files[0].name}`);
      const uploadTask = uploadBytesResumable(
        storageRef,
        event.target.files[0]
      );
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgresspercent(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL);
          });
        }
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
          <label className="form-label" htmlFor="cocktail-notes">
            Notes:
          </label>
          <input
            className="form-input-field"
            type="text"
            id="cocktail-notes"
            name="cocktail-notes"
          ></input>
          <label className="form-label" htmlFor="cocktail-grade">
            Cocktail Grade
          </label>
          <select name="cocktail-grade" id="cocktail-grade">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="F">F</option>
          </select>
          <input
            type="file"
            id="pic"
            name="pic"
            accept=".jpg, .jpeg, .png"
            onChange={uploadImage}
          ></input>
          {!imgUrl && (
            <div className="outerbar">
              <div
                className="innerbar"
                style={{ width: `${progresspercent}%` }}
              >
                {progresspercent}%
              </div>
            </div>
          )}

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
