import React, { memo } from "react";

const Story = memo(({ story, isCurrent }) => (
  <li className="list-item">
    <span className="panel-icon">
      {story.estimate != null && <span className="has-text-success">{story.estimate}</span>}
      {isCurrent && story.estimate == null && (
        <i className="material-icons has-text-success">lens</i>
      )}
    </span>
    <span className={isCurrent ? "has-text-success" : ""}>{story.name}</span>
  </li>
));

export { Story as default };
