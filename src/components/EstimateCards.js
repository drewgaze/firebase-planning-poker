import React, { Component } from "react";
import { connect } from "react-redux";
import EstimateCard from "./EstimateCard";

const estimateValues = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

class EstimateCards extends Component {
  handleChange = evt => this.setState({ story: evt.target.value });
  render() {
    return (
      <div>
        {estimateValues.map(value => (
          <EstimateCard key={value} value={value} />
        ))}
      </div>
    );
  }
}

export default connect()(EstimateCards);
