import React from "react";
import "./VersionButton.css";

function VersionButton({ onClick }) {
  return (
    <button onClick={(e) => onClick(e)} className="version-button">
      Add Version
    </button>
  );
}

export default VersionButton;
