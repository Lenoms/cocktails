import React from "react";
import { mapToColour } from "./Tag.constants";
import "./Tag.css";

function Tag({ tag }) {
  const isFestive = tag && String(tag).toLowerCase() === "festive";

  return (
    <div
      className={`tried-tag ${isFestive ? "festive" : ""}`}
      style={{ background: mapToColour(tag) }}
    >
      {isFestive && (
        <div className="lights" aria-hidden>
          {["red", "green", "yellow", "blue", "purple", "orange", "pink"].map(
            (c, i) => (
              <span key={i} className={`festive-dot ${c}`} />
            )
          )}
        </div>
      )}
      {tag}
    </div>
  );
}

export default Tag;
