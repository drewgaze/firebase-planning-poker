import React, { Component } from "react";
import { Button, Form, Input } from "reactstrap";
import { connect } from "react-redux";
import { setStory } from "../actions/gameActions";
import { isHost } from "reducers/game";

class Story extends Component {
  state = {
    story: ""
  };
  handleChange = evt => {
    this.setState({ story: evt.target.value }, () =>
      this.props.dispatch(setStory(this.state.story))
    );
  };
  render() {
    const { story, isHost } = this.props;
    return (
      <div className="my-2">
        <h6>Story</h6>
        {isHost ? (
          <div>
            <Input
              className="my-2"
              defaultValue={this.props.story}
              onChange={this.handleChange}
            />
          </div>
        ) : (
          <div>
            <span>{story}</span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ game: { story }, game }) => ({
  story,
  isHost: isHost(game)
});

export default connect(mapStateToProps)(Story);
