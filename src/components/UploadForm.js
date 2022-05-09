import React from "react";
import "./UploadForm.css";

function UploadForm({ uploadImage, imgUrl, progresspercent, defaultGrades }) {
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
