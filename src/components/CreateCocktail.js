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

function CreateCocktail() {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [progresspercent, setProgresspercent] = useState(0);
  const [imgUrl, setImgUrl] = useState(null);
  const storage = getStorage();

  function addCocktail() {
    var name = document.getElementById("cocktail-name").value;
    var grade = document.getElementById("cocktail-grade").value;
    if (image != null) {
      // const storageRef = ref(storage, `images/${image.name}`);
      // const uploadeTask = uploadBytesResumable(storageRef, image);
      // uploadTask.on(
      //   "state_changed",
      //   (snapshot) => {
      //     const progress = Math.round(
      //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //     );
      //     setProgresspercent(progress);
      //   },
      //   (error) => {
      //     alert(error);
      //   },
      //   () => {
      //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //       setImgUrl(downloadURL);
      //     });
      //   }
      // );
    }
    CocktailService.writeToDatabase(name, grade);
    // navigate("/cocktails/untried");
  }

  function setFileData(event) {
    //setImage(event.target.files[0]);
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

  console.log(imgUrl);

  return (
    <div className="create-cocktail">
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
        <input
          type="file"
          id="pic"
          name="pic"
          accept=".jpg, .jpeg, .png"
          onChange={setFileData}
        ></input>
        <button className="submit-button" type="submit">
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
    </div>
  );
}

export default CreateCocktail;
