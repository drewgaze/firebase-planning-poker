import React, { Component } from "react";
import { connect } from "react-redux";
import EstimateCard from "./EstimateCard";
import { Row } from "reactstrap";

const estimateValues = ["?", 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

class EstimateCards extends Component {
  handleChange = evt => this.setState({ story: evt.target.value });
  render() {
    return (
      <Row>
        {estimateValues.map(value => (
          <EstimateCard key={value} value={value} />
        ))}
      </Row>
    );
  }
}

export default connect()(EstimateCards);
