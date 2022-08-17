import React from "react";
import "./LoadingSpinner.css";

function LoadingSpinner() {
  return (
    <div>
      {" "}
      <img
        className="loading-cocktail-image"
        src={process.env.PUBLIC_URL + "/limewheel.png"}
      />
    </div>
  );
}

export default LoadingSpinner;
