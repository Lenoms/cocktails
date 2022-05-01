import React from "react";

function UploadForm({ uploadImage, imgUrl, progresspercent }) {
  return (
    <div>
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
          <div className="innerbar" style={{ width: `${progresspercent}%` }}>
            {progresspercent}%
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadForm;
