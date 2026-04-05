import React, { useState } from "react";
import "./CocktailUpsertForm.css";
import AddIcon from "@mui/icons-material/Add";
import TriedForm from "../TriedForm/TriedForm";
import VersionButton from "../Versions/VersionButton/VersionButton";
import VersionFormList from "../Versions/VersionFormList/VersionFormList";
import VersionForm from "../Versions/VersionForm/VersionForm";
import CocktailService from "../../services/cocktail.service";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import UploadProgress from "../UploadProgress/UploadProgress";

function CocktailUpsertForm({ addCocktail, defaultCocktailObject }) {
  const [tried, setTried] = useState(defaultCocktailObject?.tried ?? false);
  const [tags, setTags] = useState(defaultCocktailObject?.tags ?? []);
  const [isUploading, setIsUploading] = useState(false);
  const [date, setDate] = useState(
    defaultCocktailObject?.createdAt
      ? new Date(defaultCocktailObject.createdAt)
      : null,
  );

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
    ],
  );

  const handleVersionUpdate = (index, updatedVersion) => {
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
      prev.filter((version) => version.versionId !== idToDelete),
    );
  };

  const showValidationError = () => {
    document.getElementById("validation-message")?.removeAttribute("hidden");
  };

  const getFormValues = () => {
    const name = document.getElementById("cocktail-name").value;
    const danielGrade =
      tried && document.getElementById("daniel-grade").value !== ""
        ? document.getElementById("daniel-grade").value
        : null;
    const daniGrade =
      tried && document.getElementById("dani-grade").value !== ""
        ? document.getElementById("dani-grade").value
        : null;

    return {
      name,
      danielGrade,
      daniGrade,
      tried,
      tags,
      versions,
      date,
    };
  };

  const returnCocktailObject = async (e) => {
    e.preventDefault();
    const formValues = getFormValues();

    if (!formValues.name) {
      showValidationError();
      return;
    }

    setIsUploading(true);
    try {
      const versionsToSave = await CocktailService.uploadPendingVersionImages(
        formValues.versions,
      );
      const newCocktail = {
        ...formValues,
        versions: versionsToSave,
      };
      await addCocktail(newCocktail);
    } finally {
      setIsUploading(false);
    }
  };

  if (isUploading) {
    return (
      <div className="uploading-container">
        <UploadProgress durationMs={6000} />
      </div>
    );
  }

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
      {versions.length > 1 && tried ? (
        <VersionFormList
          versions={versions}
          handleVersionUpdate={handleVersionUpdate}
          onDeleteVersion={handleDeleteVersion}
        />
      ) : (
        <VersionForm
          version={versions[0]}
          versionNumber={0}
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
          <div className="form-input-field-container">
            <div style={{ marginTop: "20px" }}>
              <DatePicker
                label="Date Tried"
                value={date}
                onChange={setDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </div>
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
