import React, { Component } from "react";
import { connect } from "react-redux";
import { hasPlayerEstimated, getPlayerEstimateValue } from "../reducers/game";
import { ListGroupItem } from "reactstrap";

class Player extends Component {
  render() {
    const { player, showEstimates, value, hasEstimated } = this.props;
    return (
      <ListGroupItem>
        <div className="h-16">
          <span>
            {player.name}{" "}
            {showEstimates && <span className="text-success">{value}</span>}
          </span>
          <span
            className={
              "material-icons text-success " +
              (hasEstimated && !showEstimates ? "visible" : "invisible")
            }
          >
            check
          </span>
        </div>
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
