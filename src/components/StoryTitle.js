import React, { memo } from "react";
import { Input } from "reactstrap";

const StoryTitle = ({ isHost, story, dispatch }) => {
  const handleChange = e => {
    if (story) {
      dispatch({ type: "UPDATE_STORY", payload: e.target.value });
    }
  };
  return (
    <div className="my-2">
      <h6>Story</h6>
      {isHost ? (
        <div>
          <Input
            className="my-2"
            value={(story && story.name) || ""}
            onChange={handleChange}
          />
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
