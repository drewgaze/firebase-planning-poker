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
        <Button
          className="mr-2 float-left"
          onClick={this.handleClick}
          color="info"
        >
          Previous
        </Button>
        <Button className="mx-2" onClick={this.handleClick} color="success">
          Reveal
        </Button>
        <Button
          className="mx-2"
          type="reset"
          onClick={this.handleReset}
          color="danger"
        >
          Reset
        </Button>
        <Button
          className="ml-2 float-right"
          onClick={this.handleClick}
          color="info"
        >
          Next
        </Button>
      </div>
    );
  }
}

export default connect()(HostControls);
