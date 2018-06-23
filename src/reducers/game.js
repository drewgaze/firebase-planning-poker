import {
  CREATE_GAME,
  JOIN_GAME,
  ESTIMATE,
  PASS,
  REVEAL_ESTIMATES,
  SET_STORY,
  ADD_PLAYER
} from "actions/types";
import sum from "lodash/sum";

const initialState = {
  players: [],
  story: null,
  gameId: null,
  estimates: [],
  finalEstimate: null,
  showEstimates: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case CREATE_GAME:
      return {
        ...state,
        gameId: action.payload.gameId
      }
    case JOIN_GAME:
      return {
        ...state,
        gameId: action.payload.gameId,
        players: action.payload.players,
        estimates: action.payload.estimates,
        story: action.payload.story,
        showEstimates: action.payload.showEstimates
      }
    case ESTIMATE:
      return {
        ...state,
        estimates: [...state.estimates, action.payload.estimate]
      }
    case PASS:
      return {
        ...state,
        estimates: [...state.estimates, null]
      }
    case REVEAL_ESTIMATES:
      return {
        ...state,
        showEstimates: true,
        finalEstimate: calculateFinalEstimate(state.estimates)
      }
    case SET_STORY:
      return {
        ...state,
        story: action.payload.story,
        estimates: [],
        showEstimates: false,
        finalEstimate: null
      }
    case ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, action.state.player]
      }
    default:
      return state;
  }
}

export const calculateFinalEstimate = estimates => {
  const validEstimates = estimates.filter(estimate => estimate.value != null);
  return Math.round(sum(validEstimates)/validEstimates.length);
}

export const hasPlayerEstimated = (player, estimates) => estimates.includes(estimate => estimate.playerId === player.id);
