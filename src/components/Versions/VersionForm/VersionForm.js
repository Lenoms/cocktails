import React, { useEffect, useState } from "react";
import Ingredients from "../../Ingredients/Ingredients";
import AddPhoto from "../../AddPhoto/AddPhoto";

function VersionForm({ version, onChange, addImageAvailable }) {
  const [ingredients, setIngredients] = useState(version.ingredients || []);
  const [notes, setNotes] = useState(version.notes);
  const [imgUrl, setImgUrl] = useState(version.imgUrl ?? null);
  const [imgFile, setImgFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(version.imgUrl ?? null);

  useEffect(() => {
    onChange?.({
      ...version,
      ingredients,
      notes,
      imgUrl,
      imgFile,
      previewUrl,
    });
  }, [ingredients, notes, imgUrl, imgFile, previewUrl]);

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleFileSelected = (file, preview) => {
    setImgFile(file);
    setImgUrl(null);
    setPreviewUrl(preview);
  };

  return (
    <div>
      <Ingredients ingredients={ingredients} setIngredients={setIngredients} />
      <div className="form-input-field-container">
        <label className="form-label" htmlFor="cocktail-notes">
          Notes:
        </label>
        <textarea
          className="notes-field"
          rows={4}
          type="text"
          id="cocktail-notes"
          name="cocktail-notes"
          onChange={handleNotesChange}
          defaultValue={notes}
        ></textarea>

        {addImageAvailable && (
          <AddPhoto
            onFileSelected={handleFileSelected}
            previewUrl={previewUrl}
          />
        )}
      </div>
    </div>
  );
}

export default VersionForm;
