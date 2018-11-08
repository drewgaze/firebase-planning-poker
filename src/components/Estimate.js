import React, { Component } from "react";
import { connect } from "react-redux";
import { isHost } from "../reducers/game";

//TODO: add edit estimate

class Estimate extends Component {
  render() {
    const { finalEstimate, showEstimates } = this.props;
    return (
      <div className="my-2">
        <h6>Points</h6>
        <span>{showEstimates ? finalEstimate : "-"}</span>
      </div>
    );
  }
}

const mapStateToProps = ({ game, game: { finalEstimate, showEstimates } }) => ({
  isHost: isHost(game),
  finalEstimate,
  showEstimates
});

export default connect(mapStateToProps)(Estimate);
