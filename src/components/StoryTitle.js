import React, {
  memo,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMutationEffect
} from "react";
import { Input } from "reactstrap";
import debounce from "lodash/debounce";

const StoryTitle = ({ isHost, story, dispatch }) => {
  const [name, setName] = useState("");
  const nameRef = useRef();
  useEffect(
    () => {
      setName(story && story.name);
    },
    [story]
  );
  const handleChange = e => setName(e.target.value);

  const handleSubmit = useCallback(
    debounce(() => {
      const nameValue = nameRef.current;
      if (story) {
        dispatch({ type: "UPDATE_STORY", payload: nameValue });
      }
    }, 500),
    [nameRef, story, dispatch]
  );

  useMutationEffect(() => {
    nameRef.current = name;
    handleSubmit();
  });

  return (
    <div className="my-2">
      <h6>Story</h6>
      {isHost ? (
        <div>
          <Input className="my-2" value={name || ""} onChange={handleChange} />
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
