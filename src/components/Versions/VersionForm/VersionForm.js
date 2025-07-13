import React, { useEffect, useState } from "react";
import Ingredients from "../../Ingredients/Ingredients";
import AddPhoto from "../../AddPhoto/AddPhoto";

function VersionForm({ version, setIsUploading, onChange, addImageAvailable }) {
  const [ingredients, setIngredients] = useState(version.ingredients || []);
  const [notes, setNotes] = useState(version.notes);
  const [imgUrl, setImgUrl] = useState(version.imgUrl ?? null);

  useEffect(() => {
    console.log("ImgURL Updated: ", version, imgUrl);
  }, [imgUrl]);

  useEffect(() => {
    console.log(version);
    onChange?.({
      ...version,
      ingredients,
      notes,
      imgUrl,
    });
  }, [ingredients, notes, imgUrl]);

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
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
          <>
            {" "}
            <AddPhoto
              setImgUrl={setImgUrl}
              imgUrl={version.imgUrl}
              setIsUploading={setIsUploading}
            ></AddPhoto>
            {version.imgUrl && (
              <img
                className="create-update-image"
                src={version.imgUrl}
                alt="uploaded file"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default VersionForm;
