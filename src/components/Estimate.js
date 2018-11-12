import React, { memo } from "react";

//TODO: add edit estimate

const Estimate = memo(({ estimate }) => (
  <div className="field">
    <label className="label">Points</label>
    <span>{estimate != null ? estimate : "-"}</span>
  </div>
));

export { Estimate as default };
