import { CREATE_GAME, GET_GAME, JOIN_GAME } from "./types";
import firebase from "config/firebase";

const gamesRef = firebase.database().ref("games");

export function createGame(name) {
  return async dispatch => {
    const { key } = gamesRef.push({
      name,
      players: [],
      estimates: [],
      story: null,
      showEstimates: false
    });
    dispatch({ type: CREATE_GAME, payload: { key } });
    dispatch(joinGame(key));
    return key;
  };
}

export function getGame(key) {
  return async dispatch => {
    dispatch({ type: GET_GAME });
    const snapshot = await firebase
      .database()
      .ref()
      .child(`games/${key}`)
      .once("value");
    return { players: [], estimates: [], story: null, ...snapshot.val() };
  };
}

export function joinGame(key) {
  return async dispatch => {
    const game = await dispatch(getGame(key));
    dispatch({ type: JOIN_GAME, payload: { ...game } });
  };
}
