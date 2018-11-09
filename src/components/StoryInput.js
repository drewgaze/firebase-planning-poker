import React, { memo } from "react";
import TagsInput from "react-tagsinput";
import { Input, Badge } from "reactstrap";

function StoryInput({ stories, handleChange }) {
  return (
    <TagsInput
      inputProps={{ placeholder: "Add a story" }}
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
  return <Input type="text" onChange={onChange} value={value} {...other} />;
}

function renderTag(props) {
  let {
    tag,
    key,
    disabled,
    onRemove,
    classNameRemove,
    getTagDisplayValue,
    ...other
  } = props;
  return (
    <h6 key={key}>
      <Badge
        {...other}
        color="primary"
        className="mx-1 flex-container align-items-center"
        pill
      >
        {getTagDisplayValue(tag)}
        {!disabled && (
          <button
            className="close ml-1"
            onClick={e => {
              e.preventDefault();
              onRemove(key);
            }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        )}
      </Badge>
    </h6>
  );
}

function renderLayout(tagComponents, inputComponent) {
  return (
    <div>
      <div className="flex-container flex-wrap">{tagComponents}</div>
      {inputComponent}
    </div>
  );
}

const PureStory = memo(StoryInput);

export { PureStory as default };
