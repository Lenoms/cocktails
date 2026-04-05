import React, { useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import "./AddPhoto.css";

function AddPhoto({ onFileSelected, previewUrl }) {
  const [filePreview, setFilePreview] = useState(previewUrl ?? null);
  const addPhotoId = crypto.randomUUID();

  const handleFileSelection = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const preview = reader.result;
      setFilePreview(preview);
      onFileSelected?.(file, preview);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <label htmlFor={addPhotoId} className="custom-file-upload">
        <AddAPhotoIcon />
      </label>
      <input
        type="file"
        id={addPhotoId}
        name="pic"
        hidden
        accept=".jpg, .jpeg, .png"
        onChange={handleFileSelection}
      />
      {filePreview && (
        <img
          className="create-update-image"
          src={filePreview}
          alt="Selected cocktail preview"
        />
      )}
    </>
  );
}

export default AddPhoto;
