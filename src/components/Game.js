import React, { useEffect, useMemo } from "react";
import StoryTitle from "./StoryTitle";
import Estimate from "./Estimate";
import HostControls from "./HostControls";
import EstimateCards from "./EstimateCards";
import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import Player from "./Player";
import Stories from "./Stories";
import useFirebaseAuth from "hooks/useFirebaseAuth";
import useGameState from "hooks/useGameState";

const Game = props => {
  const user = useFirebaseAuth();
  const [game, dispatch, isReady] = useGameState(props.match.params.gameKey);

  const {
    players,
    estimates,
    showEstimates,
    host,
    stories,
    currentStory: index,
    finalEstimate
  } = game;

  const isHost = useMemo(() => user && host && user.uid === host.uid, [
    user,
    host
  ]);
  const currentStory = useMemo(
    () => (stories.length > 0 ? stories[index] : null),
    [index, stories]
  );

  useEffect(
    () => {
      if (user && isReady) {
        dispatch({
          type: "JOIN",
          payload: { name: user.displayName, uid: user.uid }
        });
      }
      return () => {
        if (user && isReady) {
          dispatch({
            type: "LEAVE",
            payload: { name: user.displayName, uid: user.uid }
          });
        }
      };
    },
    [user, isReady]
  );

  return (
    <Row className="h-100">
      <Col className="border-right d-none d-md-block" md={3}>
        <ListGroup flush>
          <ListGroupItem>
            <h6>Players</h6>
          </ListGroupItem>
          {players.map(player => (
            <Player
              isHost={isHost && host.uid === user.uid}
              player={player}
              key={player.uid}
              showEstimates={showEstimates}
              estimates={estimates}
            />
          ))}
        </ListGroup>
      </Col>
      <Col md={6} className="mx-2 mx-md-0 blue-bg">
        <Row>
          <Col>
            <StoryTitle
              isHost={isHost}
              story={currentStory}
              dispatch={dispatch}
            />
          </Col>
          <Col>
            <Estimate
              finalEstimate={finalEstimate}
              showEstimates={showEstimates}
            />
          </Col>
        </Row>
        {isHost && (
          <HostControls dispatch={dispatch} disabled={estimates.length <= 0} />
        )}
        <EstimateCards
          dispatch={dispatch}
          uid={user && user.uid}
          showEstimates={showEstimates}
          estimates={estimates}
        />
      </Col>
      <Col className="border-left d-none d-md-block" md={3}>
        <ListGroup flush>
          <ListGroupItem>
            <h6>Stories</h6>
          </ListGroupItem>
          <Stories stories={stories} currentStory={index} />
        </ListGroup>
      </Col>
    </Row>
  );
};

export { Game as default };
