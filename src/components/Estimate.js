import React, { Component } from "react";
import { connect } from "react-redux";
import { isHost } from "../reducers/game";
import { Card, CardTitle } from "reactstrap";

//TODO: add edit estimate

class Estimate extends Component {
  render() {
    const { finalEstimate, showEstimates } = this.props;
    return (
      <Card>
        <CardTitle>Points</CardTitle>
        <span>{showEstimates ? finalEstimate : "-"}</span>
      </Card>
    );
  }
}

const mapStateToProps = ({ game, game: { finalEstimate, showEstimates } }) => ({
  isHost: isHost(game),
  finalEstimate,
  showEstimates
});

export default connect(mapStateToProps)(Estimate);
