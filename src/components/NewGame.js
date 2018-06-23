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
import { connect } from "react-redux";
import { createGame } from "actions/gameActions";

class NewGame extends Component {
  state = {
    name: ""
  };
  handleChange = evt => this.setState({ name: evt.target.value });
  handleSubmit = async evt => {
    evt.preventDefault();
    const { dispatch, history } = this.props;
    const { name } = this.state;
    const key = await dispatch(createGame(name));
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
                  <Label for="name">Game Name</Label>
                  <Input type="text" name="name" id="name" onChange={this.handleChange} />
                </FormGroup>
                <Button type="submit" onClick={this.handleSubmit}>
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
