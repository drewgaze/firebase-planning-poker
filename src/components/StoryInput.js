import React, { memo } from "react";
import TagsInput from "react-tagsinput";

function StoryInput({ stories, handleChange }) {
  return (
    <TagsInput
      className="field"
      inputProps={{ className: "input", placeholder: "Press enter to add a story" }}
      renderInput={renderInput}
      renderLayout={renderLayout}
      renderTag={renderTag}
      value={stories}
      onChange={handleChange}
    />
  );
}

function renderInput({ addTag, ...props }) {
  let { onChange, value, ...other } = props;
  return <input type="text" onChange={onChange} value={value} {...other} />;
}

function renderTag(props) {
  let { tag, key, disabled, onRemove, classNameRemove, getTagDisplayValue, ...other } = props;
  return (
    <h6 key={key}>
      <span {...other} className="is-primary tag flex-container align-items-center">
        {getTagDisplayValue(tag)}
        {!disabled && (
          <span
            className="material-icons pointer"
            onClick={e => {
              e.preventDefault();
              onRemove(key);
            }}
          >
            close
          </span>
        )}
      </span>
    </h6>
  );
}

function renderLayout(tagComponents, inputComponent) {
  return (
    <>
      <label className="label">Stories</label>
      <div className="flex-container flex-wrap">{tagComponents}</div>
      <div className="control">{inputComponent}</div>
    </>
  );
}

const PureStory = memo(StoryInput);

export { PureStory as default };
