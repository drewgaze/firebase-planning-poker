import React, { useMemo } from "react";
import { ListGroupItem } from "reactstrap";

const Player = ({ player, isHost, estimates, showEstimates }) => {
  const estimate = useMemo(
    () => {
      const estimate = estimates.find(estimate => estimate.uid === player.uid);
      return estimate;
    },
    [estimates]
  );
  const hasEstimated = useMemo(() => estimate && estimate.value != null, [
    estimate
  ]);

  return (
    <ListGroupItem>
      <div className="h-16 flex-container space-between">
        <span>
          {isHost && "👑"}
          {player.name}
        </span>
        <div>
          {hasEstimated && !showEstimates && (
            <span className="material-icons text-success">check</span>
          )}
          {showEstimates && (
            <span className="text-success">{estimate.value}</span>
          )}
        </div>
      </div>
    </ListGroupItem>
  );
};

export { Player as default };
