import React, { useState, useMemo, useEffect, useRef } from "react";
import "./CocktailUpsertForm.css";
import AddIcon from "@mui/icons-material/Add";
import Ingredients from "../Ingredients/Ingredients";
import TriedForm from "../TriedForm/TriedForm";
import VersionButton from "../Versions/VersionButton/VersionButton";
import VersionFormList from "../Versions/VersionFormList/VersionFormList";
import AddPhoto from "../AddPhoto/AddPhoto";
import VersionForm from "../Versions/VersionForm/VersionForm";

function CocktailUpsertForm({ addCocktail, defaultCocktailObject }) {
  const [tried, setTried] = useState(defaultCocktailObject?.tried ?? false);
  const [tags, setTags] = useState(defaultCocktailObject?.tags ?? []);
  const [isUploading, setIsUploading] = useState(false);

  const default_grades = tried
    ? [defaultCocktailObject?.danielGrade, defaultCocktailObject?.daniGrade]
    : null;

  const [versions, setVersions] = useState(
    defaultCocktailObject?.versions ?? [
      {
        name: "Version 1",
        ingredients: [],
        notes: "",
        imgUrl: null,
        versionId: crypto.randomUUID(),
      },
    ]
  );

  const handleVersionUpdate = (index, updatedVersion) => {
    console.log(updatedVersion);
    const newVersions = [...versions];
    newVersions[index] = updatedVersion;
    setVersions(newVersions);
  };

  const handleAddVersion = (e) => {
    e.preventDefault();
    setVersions((prev) => [
      ...prev,
      {
        name: `Version ${versions.length + 1}`,
        ingredients: [],
        notes: "",
        imgUrl: null,
        versionId: crypto.randomUUID(),
      },
    ]);
  };

  const handleDeleteVersion = (e, idToDelete) => {
    e.preventDefault();
    setVersions((prev) =>
      prev.filter((version) => version.versionId !== idToDelete)
    );
  };

  const showValidationError = () => {
    document.getElementById("validation-message")?.removeAttribute("hidden");
  };

  const returnCocktailObject = (e) => {
    e.preventDefault();
    const name = document.getElementById("cocktail-name").value;
    if (!name) {
      showValidationError();
      return;
    }

    const danielGrade =
      tried && document.getElementById("daniel-grade").value !== ""
        ? document.getElementById("daniel-grade").value
        : null;
    const daniGrade =
      tried && document.getElementById("dani-grade").value !== ""
        ? document.getElementById("dani-grade").value
        : null;

    const newCocktail = {
      name,
      tried,
      danielGrade: danielGrade,
      daniGrade: daniGrade,
      tags,
      versions,
    };

    addCocktail(newCocktail);
  };

  return (
    <form className="cocktail-form" onSubmit={returnCocktailObject}>
      <h1>
        {defaultCocktailObject
          ? `Update ${defaultCocktailObject.name}`
          : "Add Cocktail"}
      </h1>

      {/* Cocktail Name */}
      <div className="form-input-field-container">
        <label className="form-label" htmlFor="cocktail-name">
          Cocktail Name
        </label>
        <input
          className="form-input-field"
          type="text"
          id="cocktail-name"
          name="cocktail-name"
          autoComplete="off"
          defaultValue={defaultCocktailObject?.name}
        />
        <p id="validation-message" hidden style={{ color: "red", margin: 0 }}>
          Cocktail name cannot be empty!
        </p>
      </div>

      {/* Tried Checkbox */}
      <div className="tried-checkbox-container">
        <div className="form-label">Tried?</div>
        <input
          type="checkbox"
          id="tried"
          onChange={() => setTried(!tried)}
          className="checkbox"
          checked={tried}
        />
      </div>

      {/* Version Forms */}
      {(versions.length > 1) & tried ? (
        <VersionFormList
          versions={versions}
          setIsUploading={setIsUploading}
          handleVersionUpdate={handleVersionUpdate}
          onDeleteVersion={handleDeleteVersion}
        />
      ) : (
        <VersionForm
          version={versions[0]}
          versionNumber={0}
          setIsUploading={setIsUploading}
          onChange={(updatedVersion) => handleVersionUpdate(0, updatedVersion)}
          addImageAvailable={tried}
        />
      )}

      {/* Add Version / Image Upload / Tags */}
      {tried && (
        <>
          <VersionButton onClick={handleAddVersion} />
          <TriedForm
            defaultGrades={default_grades}
            tags={tags}
            setTags={setTags}
          />
        </>
      )}

      {/* Submit */}
      <button disabled={isUploading} className="submit-button" type="submit">
        <AddIcon style={{ color: "white" }} />
      </button>
    </form>
  );
}

export default CocktailUpsertForm;
