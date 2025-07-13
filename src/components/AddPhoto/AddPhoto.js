import React, { useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CocktailService from "../../services/cocktail.service";
import "./AddPhoto.css";

function AddPhoto({ setImgUrl, imgUrl, setIsUploading }) {
  const [progresspercent, setProgresspercent] = useState(0);
  // ID is necessary to uniquely identify multiple photo uploads
  const addPhotoId = crypto.randomUUID();
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
        onChange={uploadImage}
      ></input>
      {!imgUrl && (
        <div className="outerbar">
          <div
            className="innerbar"
            style={{
              width: `${progresspercent}%`,
              position: "relative",
              left: progresspercent === 0 ? "10px" : "0px",
            }}
          >
            {progresspercent}%
          </div>
        </div>
      )}
    </>
  );
}

export default AddPhoto;
