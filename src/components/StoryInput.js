import React, { Component } from "react";
import TagsInput from "react-tagsinput";
import { Input, Badge } from "reactstrap";

export default class StoryInput extends Component {
  constructor() {
    super();
    this.state = { tags: [] };
  }

  handleChange = tags => {
    this.setState({ tags });
  };

  renderInput({ addTag, ...props }) {
    let { onChange, value, ...other } = props;
    return <Input type="text" onChange={onChange} value={value} {...other} />;
  }

  renderTag = props => {
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
      <h6>
        <Badge
          key={key}
          {...other}
          color="primary"
          className="mx-1 flex-container align-items-center"
          pill
        >
          {getTagDisplayValue(tag)}
          {!disabled && (
            <button className="close ml-1" onClick={e => onRemove(key)}>
              <span aria-hidden="true">&times;</span>
            </button>
          )}
        </Badge>
      </h6>
    );
  };

  renderLayout(tagComponents, inputComponent) {
    return (
      <div>
        <div className="flex-container flex-wrap">{tagComponents}</div>
        {inputComponent}
      </div>
    );
  }

  render() {
    return (
      <TagsInput
        inputProps={{ placeholder: "Add a story" }}
        renderInput={this.renderInput}
        renderLayout={this.renderLayout}
        renderTag={this.renderTag}
        value={this.state.tags}
        onChange={this.handleChange}
      />
    );
  }
}
