import React, { memo } from "react";

const StoryTitle = ({ isHost, story, dispatch }) => {
  const handleChange = e => {
    if (story) {
      dispatch({ type: "UPDATE_STORY", payload: e.target.value });
    }
  };
  return (
    <div className="field">
      <label className="label">Story</label>
      {isHost ? (
        <div className="control">
          <input className="input" value={(story && story.name) || ""} onChange={handleChange} />
        </div>
      ) : (
        <div>
          <span>{story && story.name}</span>
        </div>
      )}
    </div>
  );
};

const PureStoryTitle = memo(StoryTitle);

export { PureStoryTitle as default };
