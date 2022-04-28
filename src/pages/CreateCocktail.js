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
  const storage = getStorage();

  function addCocktail() {
    var name = document.getElementById("cocktail-name").value;
    var grade = document.getElementById("cocktail-grade").value;
    var tried = document.getElementById("tried").checked;
    CocktailService.writeToDatabase(name, grade, imgUrl, tried);
    if (tried) {
      navigate("/cocktails/tried");
    } else {
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
        <label className="form-label" htmlFor="cocktail-grade">
          Cocktail Grade
        </label>
        <input
          className="form-input-field"
          type="text"
          id="cocktail-grade"
          name="cocktail-grade"
        ></input>
        <label htmlFor="tried">Tried?</label>
        <input type="checkbox" id="tried"></input>
        <input
          type="file"
          id="pic"
          name="pic"
          accept=".jpg, .jpeg, .png"
          onChange={uploadImage}
        ></input>
        <button disabled={!imgUrl} className="submit-button" type="submit">
          Add
        </button>
      </form>

      {!imgUrl && (
        <div className="outerbar">
          <div className="innerbar" style={{ width: `${progresspercent}%` }}>
            {progresspercent}%
          </div>
        </div>
      )}
      {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}
    </motion.div>
  );
}

export default CreateCocktail;
