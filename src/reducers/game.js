import {
  CREATE_GAME,
  JOIN_GAME,
  ESTIMATE,
  PASS,
  REVEAL_ESTIMATES,
  SET_STORY,
  ADD_PLAYER,
  SET_FINAL_ESTIMATE,
  GAME_UPDATE,
  LEAVE_GAME,
  REMOVE_PLAYER
} from "actions/types";
import sum from "lodash/sum";
import { createSelector } from "reselect";
import firebase from "config/firebase";

const initialState = {
  host: null,
  players: [],
  story: null,
  key: null,
  estimates: [],
  finalEstimate: null,
  showEstimates: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GAME:
      return {
        ...state,
        key: action.payload.key
      };
    case JOIN_GAME:
      return {
        ...state,
        ...action.payload.game,
        players: [
          ...state.players.filter(
            player => player.uid !== action.payload.player.uid
          ),
          action.payload.player
        ]
      };
    case ESTIMATE:
      return {
        ...state,
        estimates: [...state.estimates, action.payload.estimate]
      };
    case PASS:
      return {
        ...state,
        estimates: [...state.estimates, null]
      };
    case REVEAL_ESTIMATES:
      return {
        ...state,
        showEstimates: true,
        finalEstimate: calculateFinalEstimate(state.estimates)
      };
    case SET_STORY:
      return {
        ...state,
        story: action.payload.story,
        estimates: [],
        showEstimates: false,
        finalEstimate: null
      };
    case ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, action.payload.player]
      };
    case SET_FINAL_ESTIMATE:
      return {
        ...state,
        finalEstimate: action.payload.finalEstimate
      };
    case GAME_UPDATE:
      return {
        ...state,
        ...action.payload.game
      };
    case LEAVE_GAME:
      return {
        ...initialState
      };
    case REMOVE_PLAYER: {
      return {
        ...state,
        players: state.players.filter(
          player => player.uid !== action.payload.uid
        )
      };
    }
    default:
      return state;
  }
};

export const calculateFinalEstimate = estimates => {
  const validEstimates = estimates.filter(estimate => estimate.value != null);
  return Math.round(sum(validEstimates) / validEstimates.length);
};

export const hasPlayerEstimated = (player, estimates) =>
  estimates.includes(estimate => estimate.uid === player.uid);

export const getPlayers = state => state.players;

export const getHost = state => state.host;

export const getHostId = createSelector(
  getHost,
  host => (host ? host.uid : null)
);

export const isHost = createSelector(getHostId, async hostId => {
  try {
    const { uid } = await firebase.auth().currentUser;
    return uid === hostId;
  } catch (error) {
    return false;
  }
});
