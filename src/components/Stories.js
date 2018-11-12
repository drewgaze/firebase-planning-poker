import React, { memo } from "react";
import Story from "./Story";

const Stories = memo(({ stories, showEstimates, currentStory }) => (
  <ul className="list has-background-light">
    {stories.map((story, i) => (
      <Story
        key={story.name + i}
        story={story}
        showEstimates={showEstimates}
        isCurrent={i === currentStory}
      />
    ))}
  </ul>
));

export { Stories as default };
