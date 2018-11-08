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
  REMOVE_PLAYER,
  RESET_ESTIMATES
} from "actions/types";
import sum from "lodash/sum";
import { createSelector } from "reselect";
import firebase from "config/firebase";

const initialState = {
  host: null,
  players: [],
  story: "",
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
        estimates: [
          ...state.estimates.filter(
            estimate => estimate.uid !== action.payload.uid
          ),
          action.payload
        ]
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
        ...action.payload.game,
        estimates: action.payload.game.estimates
          ? action.payload.game.estimates
          : [],
        players: action.payload.game.players ? action.payload.game.players : []
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
    case RESET_ESTIMATES: {
      return {
        ...state,
        estimates: [],
        showEstimates: false,
        finalEstimate: null
      };
    }
    default:
      return state;
  }
};

export const calculateFinalEstimate = estimates => {
  const validEstimates = estimates
    .filter(estimate => estimate.value != null)
    .map(estimate => estimate.value);
  return Math.round(sum(validEstimates) / validEstimates.length) || 0;
};

export const getPlayerEstimate = (state, props) => {
  const estimates = getEstimates(state);
  return estimates.find(estimate => estimate.uid === props.player.uid);
};

export const hasPlayerEstimated = createSelector(
  getPlayerEstimate,
  estimate => !!(estimate && estimate.value != null)
);

export const getPlayerEstimateValue = createSelector(
  getPlayerEstimate,
  estimate => (estimate ? estimate.value : null)
);

export const getPlayers = state => state.players;

export const getHost = state => state.host;

export const getHostId = createSelector(getHost, host =>
  host ? host.uid : null
);

export const isHost = createSelector(getHostId, hostId => {
  try {
    const { uid } = firebase.auth().currentUser;
    return uid === hostId;
  } catch (error) {
    return false;
  }
});

export const getEstimates = state => state.estimates;

export const getEstimateByValue = (state, props) => {
  const estimates = getEstimates(state);
  return estimates.find(
    estimate => estimate.value === props.value && estimate.uid === props.uid
  );
};

export const isCurrentEstimate = createSelector(
  getEstimateByValue,
  value => !!value
);
