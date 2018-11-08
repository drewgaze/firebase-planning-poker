import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import StoryInput from "./StoryInput";
import { connect } from "react-redux";
import { createGame } from "actions/gameActions";

class NewGame extends Component {
  state = {
    gameName: ""
  };
  handleChange = evt => this.setState({ gameName: evt.target.value });
  handleSubmit = async evt => {
    evt.preventDefault();
    const { dispatch, history } = this.props;
    const { gameName } = this.state;
    const key = await dispatch(createGame(gameName));
    history.push(`/game/${key}`);
  };
  render() {
    return (
      <Row>
        <Col />
        <Col sm={6} lg={4}>
          <Card>
            <CardHeader>New Game</CardHeader>
            <CardBody className="text-left">
              <Form>
                <FormGroup>
                  <Label for="gameName">Game Name</Label>
                  <Input
                    type="text"
                    name="gameName"
                    id="gameName"
                    onChange={this.handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup tag="fieldset">
                  <Label>Will you be estimating?</Label>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="radio1" /> Yes
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="radio1" /> No
                    </Label>
                  </FormGroup>
                </FormGroup>
                <FormGroup>
                  <Label for="stories">Stories</Label>
                  <StoryInput />
                </FormGroup>
                <Button
                  type="submit"
                  onClick={this.handleSubmit}
                  color="success"
                >
                  Create Game
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col />
      </Row>
    );
  }
}

export default connect()(NewGame);
