import React, { memo } from "react";
import Story from "./Story";

const Stories = memo(({ stories, currentStory }) =>
  stories.map((story, i) => (
    <Story key={story.name + i} story={story} isCurrent={i === currentStory} />
  ))
);

export { Stories as default };
