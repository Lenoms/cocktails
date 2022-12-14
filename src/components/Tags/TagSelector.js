import React, { useState } from "react";
import "./TagSelector.css";
import CreatableSelect from "react-select/creatable";
import { mapToColour, tagOptions } from "./Tag.constants";

function TagSelector({ handleSelectedTags, tags }) {
  const customStyles = {
    option: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: data.color,
      };
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: data.color ? data.color : mapToColour(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: "black",
    }),
  };

  return (
    <div className="tag-selector-container">
      <CreatableSelect
        isMulti
        options={tagOptions}
        isSearchable={true}
        onChange={(options) =>
          handleSelectedTags(options.map((option) => option.value))
        }
        defaultValue={tags.map((tag) => ({
          label: tag,
          value: tag,
          color: mapToColour(tag),
        }))}
        styles={customStyles}
      />
    </div>
  );
}

export default TagSelector;
