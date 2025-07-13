import React, { useState } from "react";
import "./VersionInfoList.css";
import "../sharedVersionStyles.css";
import VersionInfo from "../VersionInfo/VersionInfo";

function VersionInfoList({ versions }) {
  const [openIndices, setOpenIndices] = useState([]);

  const toggleAccordion = (index) => {
    setOpenIndices((prevOpenIndices) => {
      if (prevOpenIndices.includes(index)) {
        return prevOpenIndices.filter((i) => i !== index);
      } else {
        return [...prevOpenIndices, index];
      }
    });
  };

  return (
    <div className="version-info-list">
      {versions.map((version, index) => (
        <div key={version.versionId} className="version-info-item">
          <button
            type="button"
            className="accordion-toggle"
            onClick={() => toggleAccordion(index)}
          >
            {version.name}
          </button>

          <div
            className={`accordion-content ${
              openIndices.includes(index) ? "open" : ""
            }`}
          >
            <VersionInfo version={version} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default VersionInfoList;
