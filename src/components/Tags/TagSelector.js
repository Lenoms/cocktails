import React, { useState } from "react";
import "./TagSelector.css";
import CreatableSelect from "react-select/creatable";
import { mapToColour, tagOptions } from "./Tag.constants";

function TagSelector({ handleSelectedTags, tags }) {
  const customStyles = {
    option: (styles, { data }) => {
      return {
        ...styles,
        background: data.color, // bg colour in dropdown
      };
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        background: data.color ? data.color : mapToColour(), // bg colour when selected
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: "black", //Text color inside selected tag
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
