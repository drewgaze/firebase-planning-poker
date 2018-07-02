import React, { Component } from "react";
import { Button, Form, Input } from "reactstrap";
import { connect } from "react-redux";
import { setStory } from "../actions/gameActions";
import { isHost } from "reducers/game";

class Story extends Component {
  state = {
    edit: false,
    story: ""
  };
  handleChange = evt => this.setState({ story: evt.target.value });
  handleClick = () => this.setState(state => ({ edit: !state.edit }));
  handleSubmit = evt => {
    evt.preventDefault();
    this.props.dispatch(setStory(this.state.story));
    this.handleClick();
  };
  render() {
    const { edit } = this.state;
    const { story, isHost } = this.props;
    return (
      <div className="my-2">
        {edit && isHost ? (
          <div>
            <Form>
              <Input
                className="my-2"
                defaultValue={this.props.story}
                onChange={this.handleChange}
              />
              <Button
                className="mx-2"
                type="submit"
                onClick={this.handleSubmit}
              >
                Update
              </Button>
              <Button className="mx-2" type="submit" onClick={this.handleClick}>
                Cancel
              </Button>
            </Form>
          </div>
        ) : (
          <div>
            <span>{story}</span>
            {isHost && (
              <Button className="mx-2" onClick={this.handleClick}>
                Edit
              </Button>
            )}
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
