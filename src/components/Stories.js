import React, { memo } from "react";
import Story from "./Story";

const Stories = memo(({ stories, showEstimates, currentStory, dispatch }) => (
  <ul className="list has-background-white-bis">
    {stories.map((story, i) => (
      <Story
        key={story.name + i}
        story={story}
        showEstimates={showEstimates}
        isCurrent={i === currentStory}
        dispatch={dispatch}
      />
    ))}
  </ul>
));

export { Stories as default };
