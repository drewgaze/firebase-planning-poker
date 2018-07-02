import React, { Component } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { revealEstimates, resetEstimates } from "../actions/gameActions";

class HostControls extends Component {
  handleChange = evt => this.setState({ story: evt.target.value });
  handleClick = () => this.props.dispatch(revealEstimates());
  handleReset = () => this.props.dispatch(resetEstimates());
  render() {
    return (
      <div className="my-2">
        <Button className="mx-2" onClick={this.handleClick}>
          Flip Cards
        </Button>
        <Button className="mx-2" type="reset" onClick={this.handleReset}>
          Reset
        </Button>
      </div>
    );
  }
}

export default connect()(HostControls);
