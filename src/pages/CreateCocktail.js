import React from "react";
import "./CreateCocktail.css";
import CocktailService from "../services/cocktail.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { motion } from "framer-motion";

function CreateCocktail() {
  const navigate = useNavigate();
  const [progresspercent, setProgresspercent] = useState(0);
  const [imgUrl, setImgUrl] = useState(null);
  const [tried, setTried] = useState(false);
  const storage = getStorage();

  function addCocktail() {
    var name = document.getElementById("cocktail-name").value;
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

  function uploadImage(event) {
    const storageRef = ref(storage, `images/${event.target.files[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, event.target.files[0]);
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
      <h1>Add Cocktail</h1>
      <form className="cocktail-form" onSubmit={addCocktail}>
        <label className="form-label" htmlFor="cocktail-name">
          Cocktail Name
        </label>
        <input
          className="form-input-field"
          type="text"
          id="cocktail-name"
          name="cocktail-name"
        ></input>
        <label htmlFor="tried">Tried?</label>
        <input type="checkbox" id="tried" onChange={checkboxClicked}></input>
        {tried && (
          <>
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
            {!imgUrl && tried && (
              <div className="outerbar">
                <div
                  className="innerbar"
                  style={{ width: `${progresspercent}%` }}
                >
                  {progresspercent}%
                </div>
              </div>
            )}
          </>
        )}

        <button
          disabled={progresspercent != 0 && progresspercent != 100}
          className="submit-button"
          type="submit"
        >
          Add
        </button>
      </form>
      {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}
    </motion.div>
  );
}

export default CreateCocktail;
