import React, { useCallback } from "react";

const HostControls = ({ dispatch, disabled }) => {
  const handleReveal = useCallback(() => dispatch({ type: "SHOW_ESTIMATES" }), [dispatch]);
  const handleReset = useCallback(() => dispatch({ type: "RESET" }), [dispatch]);
  const handleNext = useCallback(() => dispatch({ type: "NEXT_STORY" }), [dispatch]);
  const handlePrev = useCallback(() => dispatch({ type: "PREVIOUS_STORY" }), [dispatch]);
  return (
    <div className="columns is-mobile">
      <div className="column">
        <button
          className="button has-background-grey-light is-hovered is-pulled-left material-icons"
          onClick={handlePrev}
        >
          arrow_back
        </button>
      </div>
      <div className="column is-2-desktop">
        <button
          className="button is-primary is-pulled-left"
          onClick={handleReveal}
          disabled={disabled}
        >
          <span className="material-icons">rotate_left</span>
          Reveal
        </button>
      </div>
      <div className="column is-2-desktop">
        <button
          className="button is-danger is-pulled-right"
          type="reset"
          onClick={handleReset}
          disabled={disabled}
        >
          <span className="material-icons">undo</span>
          Reset
        </button>
      </div>
      <div className="column">
        <button
          className="button has-background-grey-light is-hovered is-pulled-right material-icons"
          onClick={handleNext}
        >
          arrow_forward
        </button>
      </div>
    </div>
  );
};

export { HostControls as default };
