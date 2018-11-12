import React, { useMemo } from "react";

const Player = ({ player, isHost, estimates, showEstimates }) => {
  const estimate = useMemo(
    () => {
      const estimate = estimates.find(estimate => estimate.uid === player.uid);
      return estimate;
    },
    [estimates]
  );
  const hasEstimated = useMemo(() => estimate && estimate.value != null, [estimate]);

  return (
    <li className="list-item">
      <span className="panel-icon">
        {hasEstimated && !showEstimates && (
          <span className="material-icons has-text-success">check</span>
        )}
        {showEstimates && <span className="has-text-success">{estimate.value}</span>}
      </span>
      <span>
        {isHost && "👑"}
        {player.name}
      </span>
    </li>
  );
};

export { Player as default };
