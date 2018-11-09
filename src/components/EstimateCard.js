import React, { memo, useMemo, useCallback } from "react";
import { Card, CardText, CardBody, Col } from "reactstrap";

const EstimateCard = memo(
  ({ value, dispatch, uid, estimates, showEstimates }) => {
    const isSelected = useMemo(
      () =>
        !!estimates.find(
          estimate => estimate.value === value && estimate.uid === uid
        ),
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
    return (
      <Col md={4} className="my-2">
        <Card
          className="shadow-sm hover-shadow"
          onClick={handleClick}
          color={isSelected ? "success" : null}
          inverse={isSelected}
        >
          <CardBody>
            <CardText>{value}</CardText>
          </CardBody>
        </Card>
      </Col>
    );
  }
);

export { EstimateCard as default };
