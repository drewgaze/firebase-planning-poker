import React, { memo } from "react";
import { ListGroupItem } from "reactstrap";

const Story = memo(({ story, isCurrent }) => (
  <ListGroupItem>
    <div className="h-16 flex-container space-between">
      <span className={isCurrent ? "text-success" : "text-muted"}>
        {story.name}
      </span>
      <div>
        {story.estimate && (
          <span className="text-success">{story.estimate}</span>
        )}
      </div>
    </div>
  </ListGroupItem>
));

export { Story as default };
