import {
  CREATE_GAME,
  GET_GAME,
  JOIN_GAME,
  ESTIMATE,
  PASS,
  REVEAL_ESTIMATES,
  SET_STORY,
  GAME_UPDATE,
  LEAVE_GAME,
  REMOVE_PLAYER,
  RESET_ESTIMATES
} from "./types";
import firebase from "config/firebase";
import { firebaseAction } from "middleware/firebase";

const gamesRef = firebase.database().ref("games");

export function createGame(gameName) {
  return async dispatch => {
    const { displayName: name, uid } = firebase.auth().currentUser;
    const { key } = gamesRef.push({
      host: { name, uid },
      name: gameName,
      players: [],
      estimates: [],
      story: "-",
      showEstimates: false
    });
    await dispatch({ type: CREATE_GAME, payload: { key } });
    await dispatch(joinGame(key));
    return key;
  };
}

export function getGame(key) {
  return async dispatch => {
    dispatch({ type: GET_GAME });
    const snapshot = await gamesRef.child(key).once("value");
    const { players = [], estimates = [], story, ...props } = snapshot.val();
    return { players, estimates, story, ...props };
  };
}

export function joinGame(key) {
  return async dispatch => {
    const game = await dispatch(getGame(key));
    const { displayName: name, uid } = firebase.auth().currentUser;
    await dispatch(
      firebaseAction({
        type: JOIN_GAME,
        payload: {
          game: { key, ...game },
          player: { name, uid }
        }
      })
    );
  };
}

export function leaveGame() {
  return async dispatch => {
    const { uid } = await firebase.auth().currentUser;
    dispatch(removePlayer(uid));
    dispatch({ type: LEAVE_GAME });
  };
}

export function estimate(value) {
  return async dispatch => {
    const { uid } = await firebase.auth().currentUser;
    dispatch(
      firebaseAction({
        type: ESTIMATE,
        payload: {
          value,
          uid
        }
      })
    );
  };
}

export function pass() {
  return async dispatch => {
    const { uid } = await firebase.auth().currentUser;
    dispatch(
      firebaseAction({
        type: PASS,
        payload: {
          uid
        }
      })
    );
  };
}

export function revealEstimates() {
  return firebaseAction({
    type: REVEAL_ESTIMATES
  });
}

export function resetEstimates() {
  return firebaseAction({ type: RESET_ESTIMATES });
}

export function setStory(story) {
  return firebaseAction({
    type: SET_STORY,
    payload: {
      story
    }
  });
}

export function removePlayer(uid) {
  return firebaseAction({
    type: REMOVE_PLAYER,
    payload: {
      uid
    }
  });
}

export function updateGame(game) {
  return {
    type: GAME_UPDATE,
    payload: {
      game
    }
  };
}
