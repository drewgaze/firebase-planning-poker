import React, { Component } from "react";
import { connect } from "react-redux";
import { isHost } from "../reducers/game";
import firebase from "config/firebase";
import {
  updateGame,
  joinGame,
  getGame,
  leaveGame
} from "../actions/gameActions";
import Story from "./Story";
import Estimate from "./Estimate";
import HostControls from "./HostControls";
import EstimateCards from "./EstimateCards";
import { Row, Col, Container, ListGroup, ListGroupItem } from "reactstrap";
import Player from "./Player";

class Game extends Component {
  gameRef = firebase.database().ref(`games/${this.props.match.params.gameKey}`);
  getCurrentUser = () =>
    new Promise(resolve => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        if (user) {
          resolve(user);
          unsubscribe();
        }
      });
    });
  joinGame = async () => {
    const {
      dispatch,
      match: {
        params: { gameKey }
      }
    } = this.props;
    const { uid } = await this.getCurrentUser();
    const game = await dispatch(getGame(gameKey));
    if (!game.players.find(player => player.uid === uid)) {
      dispatch(joinGame(gameKey));
    }
  };
  async componentDidMount() {
    const { dispatch } = this.props;
    this.gameRef.on("value", snapshot => {
      dispatch(updateGame(snapshot.val()));
    });
    this.joinGame();
  }
  componentWillUnmount() {
    const {
      match: {
        params: { gameKey }
      },
      dispatch
    } = this.props;
    this.gameRef.off();
    dispatch(leaveGame(gameKey));
  }
  render() {
    const { isHost, players } = this.props;
    return (
      <Row className="h-100">
        <Col className="border-right d-xs-none" md={3}>
          <ListGroup flush>
            <ListGroupItem>
              <h6>Players</h6>
            </ListGroupItem>
            {players.map(player => (
              <Player player={player} key={player.uid} />
            ))}
          </ListGroup>
        </Col>
        <Col md={6} className="mx-xs-2">
          <Row>
            <Col>
              <Story />
            </Col>
            <Col>
              <Estimate />
            </Col>
          </Row>
          {isHost && <HostControls />}
          <EstimateCards />
        </Col>
        <Col className="border-left d-xs-none" md={3}>
          <ListGroup flush>
            <ListGroupItem>
              <h6>Stories</h6>
            </ListGroupItem>
            {players.map(player => (
              <Player player={player} key={player.uid} />
            ))}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  isHost: isHost(game),
  players: game.players
});

export default connect(mapStateToProps)(Game);
