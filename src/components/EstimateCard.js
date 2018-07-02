import React, { Component } from "react";
import { connect } from "react-redux";
import { estimate } from "../actions/gameActions";
import { Card, CardText, CardBody } from "reactstrap";
import { isCurrentEstimate } from "../reducers/game";

class EstimateCard extends Component {
  handleClick = () => {
    const { value, isDisabled, dispatch } = this.props;
    if (!isDisabled) dispatch(estimate(value));
  };
  render() {
    return (
      <Card
        onClick={this.handleClick}
        color={this.props.color}
        inverse={this.props.inverse}
      >
        <CardBody>
          <CardText>{this.props.value}</CardText>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = ({ game, user: { uid } }, props) => {
  const isSelected = isCurrentEstimate(game, { ...props, uid });
  return {
    isDisabled: game.showEstimates,
    color: isSelected ? "dark" : null,
    inverse: isSelected
  };
};

export default connect(mapStateToProps)(EstimateCard);
