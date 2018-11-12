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
          <span className="material-icons has-text-primary">check</span>
        )}
        {showEstimates && <span className="has-text-primary">{estimate.value}</span>}
      </span>
      <span>
        {player.name}
        {isHost && " 👑"}
      </span>
    </li>
  );
};

export { Player as default };
