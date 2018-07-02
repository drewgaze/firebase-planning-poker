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
import { ListGroup } from "reactstrap";
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
    const {
      isHost,
      match: {
        params: { gameKey }
      },
      players
    } = this.props;
    return (
      <div>
        <Story />
        <Estimate />
        {isHost && <HostControls />}
        <div>
          game key is {gameKey} and you {isHost ? "are" : "are not"} the host.
        </div>
        <div>
          <span>players:</span>
          <ListGroup>
            {players.map(player => <Player player={player} key={player.uid} />)}
          </ListGroup>
        </div>
        <EstimateCards />
        {/*
          {estimate}
          <HostControls />
          <Players />
          <EstimateCards />
      
        */}
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  isHost: isHost(game),
  players: game.players
});

export default connect(mapStateToProps)(Game);
