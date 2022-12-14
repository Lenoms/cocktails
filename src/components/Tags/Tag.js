import React from "react";
import { mapToColour } from "./Tag.constants";
import "./Tag.css";

function Tag({ tag }) {
  return (
    <div className="tried-tag" style={{ backgroundColor: mapToColour(tag) }}>
      {tag}
    </div>
  );
}

export default Tag;
