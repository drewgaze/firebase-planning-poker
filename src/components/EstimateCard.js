import React, { Component } from "react";
import { connect } from "react-redux";
import { estimate } from "../actions/gameActions";
import { Card, CardText, CardBody, Col } from "reactstrap";
import { isCurrentEstimate } from "../reducers/game";

class EstimateCard extends Component {
  handleClick = () => {
    const { value, isSelected, isDisabled, dispatch } = this.props;
    if (!isDisabled) {
      if (isSelected) {
        dispatch(estimate(null));
      } else {
        dispatch(estimate(value));
      }
    }
  };
  render() {
    return (
      <Col md={4} className="my-2">
        <Card
          onClick={this.handleClick}
          color={this.props.color}
          inverse={this.props.isSelected}
        >
          <CardBody>
            <CardText>{this.props.value}</CardText>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = ({ game, user: { uid } }, props) => {
  const isSelected = isCurrentEstimate(game, { ...props, uid });
  return {
    isDisabled: game.showEstimates,
    color: isSelected ? "success" : null,
    isSelected
  };
};

export default connect(mapStateToProps)(EstimateCard);
