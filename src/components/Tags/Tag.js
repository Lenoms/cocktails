import React from "react";
import { christmasLightsColours, mapToColour } from "./Tag.constants";
import "./Tag.css";
import "./Festive.css";
import "./Halloween.css";

function Tag({ tag }) {
  const lower = tag && String(tag).toLowerCase();
  const isFestive = lower === "festive";
  const isHalloween = lower === "halloween";

  return (
    <div
      className={`tried-tag ${isFestive ? "festive" : ""} ${
        isHalloween ? "halloween" : ""
      }`}
      style={{ background: mapToColour(tag) }}
    >
      {isFestive && (
        <div className="lights" aria-hidden>
          {christmasLightsColours.map((c, i) => (
            <span key={i} className={`festive-dot ${c}`} />
          ))}
        </div>
      )}

      {isHalloween && (
        <div className="pumpkin" aria-hidden>
          <div className="pumpkin-stem"></div>
          <div className="pumpkin-content">{tag}</div>
        </div>
      )}

      {!isHalloween && tag}
    </div>
  );
}

export default Tag;
