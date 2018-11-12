import React, { memo } from "react";
import EstimateCard from "./EstimateCard";

const estimateValues = ["?", 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

const EstimateCards = memo(({ dispatch, uid, showEstimates, estimates }) => (
  <div className="columns">
    <div className="column" />
    <div className="column">
      <div className="columns is-multiline">
        {estimateValues.map(value => (
          <EstimateCard
            key={value}
            value={value}
            dispatch={dispatch}
            uid={uid}
            showEstimates={showEstimates}
            estimates={estimates}
          />
        ))}
      </div>
    </div>
    <div className="column" />
  </div>
));

export { EstimateCards as default };
