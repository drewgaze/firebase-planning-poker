import React, { Component } from "react";
import { connect } from "react-redux";
import { hasPlayerEstimated, getPlayerEstimateValue } from "../reducers/game";
import { ListGroupItem } from "reactstrap";

class Player extends Component {
  render() {
    const { player, showEstimates, value, hasEstimated } = this.props;
    return (
      <ListGroupItem>
        <span className={hasEstimated ? "text-success" : null}>
          {player.name} {showEstimates && value}
        </span>
      </ListGroupItem>
    );
  }
}

const mapStateToProps = ({ game }, props) => ({
  showEstimates: game.showEstimates,
  value: getPlayerEstimateValue(game, props),
  hasEstimated: hasPlayerEstimated(game, props)
});

export default connect(mapStateToProps)(Player);
