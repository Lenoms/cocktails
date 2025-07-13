import React from "react";
import "./TriedForm.css";
import { useState } from "react";
import TagSelector from "../Tags/TagSelector";

function TriedForm({ defaultGrades, tags, setTags }) {
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
              defaultValue={defaultGrades ? defaultGrades[0] : ""}
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
              defaultValue={defaultGrades ? defaultGrades[1] : ""}
            ></input>
          </div>
        </div>
      </div>

      <div className="form-input-field-container">
        <label className="form-label" htmlFor="cocktail-tags">
          Tags
        </label>
        <div className="form-tags-container">
          <TagSelector handleSelectedTags={setTags} tags={tags} />
        </div>
      </div>
    </div>
  );
}

export default TriedForm;
