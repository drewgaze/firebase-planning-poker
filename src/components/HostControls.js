import React, { useCallback } from "react";
import { Button } from "reactstrap";

const HostControls = ({ dispatch, disabled }) => {
  const handleReveal = useCallback(() => dispatch({ type: "SHOW_ESTIMATES" }), [
    dispatch
  ]);
  const handleReset = useCallback(() => dispatch({ type: "RESET" }), [
    dispatch
  ]);
  const handleNext = useCallback(() => dispatch({ type: "NEXT_STORY" }), [
    dispatch
  ]);
  const handlePrev = useCallback(() => dispatch({ type: "PREVIOUS_STORY" }), [
    dispatch
  ]);
  return (
    <div className="my-2">
      <Button
        className="mr-2 float-left material-icons"
        onClick={handlePrev}
        color="info"
      >
        arrow_back
      </Button>
      <Button
        className="mx-2"
        onClick={handleReveal}
        color="success"
        disabled={disabled}
      >
        Reveal
      </Button>
      <Button
        className="mx-2"
        type="reset"
        onClick={handleReset}
        color="danger"
        disabled={disabled}
      >
        Reset
      </Button>
      <Button
        className="ml-2 float-right material-icons"
        onClick={handleNext}
        color="info"
      >
        arrow_forward
      </Button>
    </div>
  );
};

export { HostControls as default };
