import React from "react";
import "./UploadForm.css";

function UploadForm({
  uploadImage,
  imgUrl,
  progresspercent,
  setIngredients,
  ingredients,
  cocktail = { cocktailNotes: "" },
}) {
  return (
    <div className="upload-form">
      <div className="form-input-field-container">
        <label className="form-label" htmlFor="cocktail-grade">
          Cocktail Grade
        </label>
        <select
          className="grade-selector"
          name="cocktail-grade"
          id="cocktail-grade"
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="F">F</option>
        </select>
      </div>

      <div className="form-input-field-container">
        <input
          type="file"
          id="pic"
          name="pic"
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

export default UploadForm;
