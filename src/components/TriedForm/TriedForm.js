import React, { useEffect } from "react";
import "./TriedForm.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CocktailService from "../../services/cocktail.service";
import { useState } from "react";

function TriedForm({ setImgUrl, imgUrl, setIsUploading, defaultGrades }) {
  const [progresspercent, setProgresspercent] = useState(0);

  function uploadImage(event) {
    setIsUploading(true);
    CocktailService.uploadImage(
      event,
      setProgresspercent,
      setImgUrl,
      setIsUploading
    );
  }

  return (
    <div className="upload-form">
      <div className="form-input-field-container">
        <div className="grades-container">
          <div className="grade-container">
            <label className="form-label" htmlFor="cocktail-grade">
              Daniel Grade
            </label>
            <input
              className="grade-number-selector"
              type="number"
              min="1"
              max="100"
              id="daniel-grade"
              defaultValue={defaultGrades ? defaultGrades[0] : 0}
            ></input>
          </div>
          <div className="grade-container">
            <label className="form-label" htmlFor="cocktail-grade">
              Dani Grade
            </label>
            <input
              className="grade-number-selector"
              type="number"
              min="1"
              max="100"
              id="dani-grade"
              defaultValue={defaultGrades ? defaultGrades[1] : 0}
            ></input>
          </div>
        </div>
      </div>

      <div className="form-input-field-container">
        <label htmlFor="pic" className="custom-file-upload">
          <AddAPhotoIcon />
        </label>
        <input
          type="file"
          id="pic"
          name="pic"
          hidden
          accept=".jpg, .jpeg, .png"
          onChange={uploadImage}
        ></input>
        {!imgUrl && (
          <div className="outerbar">
            <div className="innerbar" style={{ width: `${progresspercent}%` }}>
              {progresspercent}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TriedForm;
