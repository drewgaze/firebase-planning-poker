import React, { memo, useMemo, useCallback } from "react";

const EstimateCard = memo(({ value, dispatch, uid, estimates, showEstimates }) => {
  const isSelected = useMemo(
    () => !!estimates.find(estimate => estimate.value === value && estimate.uid === uid),
    [estimates, uid]
  );
  const handleClick = useCallback(
    () => {
      if (!showEstimates) {
        if (isSelected) {
          dispatch({ type: "ESTIMATE", payload: { value: null, uid } });
        } else {
          dispatch({ type: "ESTIMATE", payload: { value, uid } });
        }
      }
    },
    [showEstimates, isSelected, uid]
  );
  const selectedClass = isSelected ? "has-background-success has-text-white" : "";
  const revealedClass = showEstimates && !isSelected ? "is-invisible" : "";
  return (
    <div className="column is-4">
      <div
        className={`card pointer hover-shadow ${selectedClass} ${revealedClass}`}
        onClick={handleClick}
      >
        <div className="card-content">
          <p className="has-text-centered is-size-4 has-text-weight-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
});

export { EstimateCard as default };
