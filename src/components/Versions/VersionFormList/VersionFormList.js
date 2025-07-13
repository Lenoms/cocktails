import React, { useState } from "react";
import VersionForm from "../VersionForm/VersionForm";
import DeleteIcon from "@mui/icons-material/Delete";
import "./VersionFormList.css"; // Optional for styling
import "../sharedVersionStyles.css";

function VersionFormList({
  versions,
  setIsUploading,
  handleVersionUpdate,
  onDeleteVersion,
}) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="version-form-list">
      {versions.map((version, index) => (
        <div key={version.versionId} className="version-item">
          <button
            type="button"
            className="accordion-toggle"
            onClick={() => toggleAccordion(index)}
          >
            <input
              type="text"
              className="version-button-text"
              defaultValue={version.name}
              onChange={(event) => {
                event.preventDefault();
                handleVersionUpdate(index, {
                  ...version,
                  name: event.target.value,
                });
              }}
            ></input>
            <button
              className="version-delete-button"
              onClick={(e) => onDeleteVersion(e, version.versionId)}
            >
              <DeleteIcon style={{ color: "black" }} />
            </button>
          </button>

          <div
            className={`accordion-content ${openIndex === index ? "open" : ""}`}
          >
            <VersionForm
              version={version}
              versionNumber={index}
              setIsUploading={setIsUploading}
              onChange={(updatedVersion) => {
                handleVersionUpdate(index, updatedVersion);
              }}
              addImageAvailable={true}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default VersionFormList;
