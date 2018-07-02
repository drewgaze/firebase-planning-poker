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
      <div>
        <Button onClick={this.handleClick}>Flip Cards</Button>
        <Button type="reset" onClick={this.handleReset}>
          Reset
        </Button>
      </div>
    );
  }
}

export default connect()(HostControls);
