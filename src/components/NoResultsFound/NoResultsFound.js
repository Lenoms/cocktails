import React from "react";
import "./NoResultsFound.css";

function NoResultsFound() {
  return (
    <div className="no-results-found-container">
      <div className="no-results-found-image">
        <img src={process.env.PUBLIC_URL + "/404Shaker.png"} />
      </div>

      <h5 className="no-results-found-message">No results found.</h5>
    </div>
  );
}

export default NoResultsFound;
