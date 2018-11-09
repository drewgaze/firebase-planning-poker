import React, { memo } from "react";
import EstimateCard from "./EstimateCard";
import { Row } from "reactstrap";

const estimateValues = ["?", 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

const EstimateCards = memo(({ dispatch, uid, showEstimates, estimates }) => (
  <Row>
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
  </Row>
));

export { EstimateCards as default };
