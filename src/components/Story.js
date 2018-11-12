import React, { memo, useState, useCallback, useRef } from "react";

const Story = memo(({ story, isCurrent, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const editRef = useRef();
  const handleClick = useCallback(
    () => {
      setIsEditing(!isEditing);
    },
    [isEditing]
  );
  const handleBlur = useCallback(() => {
    setIsEditing(false);
  });

  return (
    <li className="list-item">
      <span className="panel-icon">
        {story.estimate != null && <span className="has-text-primary">{story.estimate}</span>}
        {isCurrent && story.estimate == null && (
          <i className="material-icons has-text-primary">lens</i>
        )}
      </span>
      {isEditing ? (
        <input onBlur={handleBlur} className="input" />
      ) : (
        <span className={isCurrent ? "has-text-primary" : ""}>{story.name}</span>
      )}
      <button
        ref={editRef}
        className="button is-small is-primary is-pulled-right edit"
        onClick={handleClick}
        onBlur={handleBlur}
      >
        edit
      </button>
    </li>
  );
});

export { Story as default };
