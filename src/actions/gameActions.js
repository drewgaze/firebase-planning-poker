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
  REMOVE_PLAYER
} from "./types";
import firebase from "config/firebase";

const gamesRef = firebase.database().ref("games");

export function createGame(gameName) {
  return async dispatch => {
    const { displayName: name, uid } = firebase.auth().currentUser;
    const { key } = gamesRef.push({
      host: { name, uid },
      name: gameName,
      players: [],
      estimates: [],
      story: null,
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
    const {
      players = [],
      estimates = [],
      story = null,
      ...props
    } = snapshot.val();
    return { players, estimates, story, ...props };
  };
}

export function joinGame(key) {
  return async dispatch => {
    const game = await dispatch(getGame(key));
    const { displayName: name, uid } = firebase.auth().currentUser;
    await dispatch({
      type: JOIN_GAME,
      payload: {
        game: { key, ...game },
        player: { name, uid }
      },
      meta: {
        firebase: true
      }
    });
  };
}

export function leaveGame() {
  return async dispatch => {
    const { uid } = await firebase.auth().currentUser;
    dispatch(removePlayer(uid));
    dispatch({ type: LEAVE_GAME });
  };
}

export function estimate(estimate) {
  return async (dispatch, getState) => {
    const { uid } = await firebase.auth().currentUser;
    dispatch({
      type: ESTIMATE,
      payload: {
        estimate,
        uid
      },
      meta: {
        firebase: true
      }
    });
  };
}

export function pass() {
  return async dispatch => {
    dispatch({
      type: PASS,
      meta: {
        firebase: true
      }
    });
  };
}

export function revealEstimates() {
  return {
    type: REVEAL_ESTIMATES,
    meta: {
      firebase: true
    }
  };
}

export function setStory(story) {
  return {
    type: SET_STORY,
    payload: {
      story
    },
    meta: {
      firebase: true
    }
  };
}

export function removePlayer(uid) {
  return {
    type: REMOVE_PLAYER,
    payload: {
      uid
    },
    meta: {
      firebase: true
    }
  };
}

export function updateGame(game) {
  return {
    type: GAME_UPDATE,
    payload: {
      game
    }
  };
}
