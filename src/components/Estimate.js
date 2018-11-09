import React, { memo } from "react";

//TODO: add edit estimate

const Estimate = memo(({ finalEstimate, showEstimates }) => {
  return (
    <div className="my-2">
      <h6>Points</h6>
      <span>{showEstimates ? finalEstimate : "-"}</span>
    </div>
  );
});

export { Estimate as default };
