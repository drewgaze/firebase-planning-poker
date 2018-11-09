import React, { useState, useRef, useMutationEffect, useCallback } from "react";
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
import useFirebaseAuth from "hooks/useFirebaseAuth";
import firebase from "config/firebase";

function NewGame({ history }) {
  const user = useFirebaseAuth();
  const [name, setName] = useState("");
  const [stories, setStories] = useState([]);
  const inputRef = useRef();

  useMutationEffect(() => {
    inputRef.current = name;
  });

  const handleSubmit = useCallback(
    async evt => {
      evt.preventDefault();
      const key = await createGame(
        {
          name: inputRef.current,
          stories: stories.map(story => ({ name: story }))
        },
        user
      );
      history.push(`/game/${key}`);
    },
    [history, inputRef, stories, user]
  );
  return (
    <Row>
      <Col lg={12}>
        <Card>
          <CardHeader>New Game</CardHeader>
          <CardBody className="text-left">
            <Form className="needs-validation">
              <FormGroup>
                <Label for="gameName">Game Name</Label>
                <Input
                  type="text"
                  name="gameName"
                  id="gameName"
                  onChange={e => setName(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="stories">Stories</Label>
                <StoryInput stories={stories} handleChange={setStories} />
              </FormGroup>
              <Button type="submit" onClick={handleSubmit} color="success">
                Create Game
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

async function createGame(game, user) {
  const { displayName: name, uid } = user;
  const newGame = {
    ...game,
    host: { name, uid },
    players: [],
    estimates: [],
    currentStory: 0,
    showEstimates: false
  };
  const { key } = firebase
    .database()
    .ref("games")
    .push(newGame);
  return key;
}

export { NewGame as default };
