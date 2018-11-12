import { useEffect, useReducer, useState } from "react";
import firebase from "config/firebase";
import sum from "lodash/sum";

const initialState = {
  host: null,
  players: [],
  currentStory: 0,
  name: "",
  estimates: [],
  stories: [],
  finalEstimate: null,
  showEstimates: false
};

function useGameState(key) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isReady, setIsReady] = useState(false);

  // retrieve initial state
  useEffect(async () => {
    const gameRef = firebase.database().ref(`games/${key}`);
    const game = await gameRef.once("value").then(snapshot => snapshot.val());
    dispatch({ type: "UPDATE", payload: game });
    setIsReady(true);
  }, []);

  // handle updates from other players
  useEffect(
    () => {
      const gameRef = firebase.database().ref(`games/${key}`);
      if (isReady) {
        gameRef.on("value", snapshot => {
          dispatch({ type: "UPDATE", payload: { ...snapshot.val() } });
        });
      }
      return () => {
        if (isReady) gameRef.off();
      };
    },
    [key, isReady]
  );

  // persist our updates
  useEffect(
    () => {
      if (state.lastAction && state.lastAction !== "UPDATE" && isReady) {
        const { lastAction, ...game } = state;
        firebase
          .database()
          .ref(`games/${key}`)
          .set(game);
      }
    },
    [state.lastAction, key, isReady]
  );

  return [state, dispatch, isReady];
}

function reducer(state, action) {
  state.lastAction = action.type;
  switch (action.type) {
    case "JOIN":
      return {
        ...state,
        players: [
          ...state.players.filter(player => player.uid !== action.payload.uid),
          action.payload
        ]
      };
    case "ESTIMATE": {
      const estimates = state.estimates.filter(estimate => estimate.uid !== action.payload.uid);
      if (action.payload.value != null) estimates.push(action.payload);
      return {
        ...state,
        estimates
      };
    }
    case "SHOW_ESTIMATES": {
      const finalEstimate = calculateFinalEstimate(state.estimates);
      return {
        ...state,
        showEstimates: true,
        finalEstimate,
        stories: updateCurrentStory(state, "estimate", finalEstimate)
      };
    }
    case "SET_FINAL_ESTIMATE":
      return {
        ...state,
        finalEstimate: action.payload,
        stories: updateCurrentStory(state, "estimate", action.payload)
      };
    case "SET_STORY":
      return {
        ...state,
        story: action.payload.story,
        estimates: [],
        showEstimates: false,
        finalEstimate: null
      };
    case "LEAVE":
      return {
        ...state,
        players: state.players.filter(player => player.uid !== action.payload.uid)
      };
    case "RESET":
      return {
        ...state,
        estimates: [],
        showEstimates: false,
        finalEstimate: null,
        stories: updateCurrentStory(state, "estimate", null)
      };
    case "NEXT_STORY":
      return {
        ...state,
        estimates: [],
        showEstimates: false,
        finalEstimate: null,
        currentStory: (state.currentStory + 1) % state.stories.length
      };
    case "PREVIOUS_STORY": {
      const len = state.stories.length;
      return {
        ...state,
        estimates: [],
        showEstimates: false,
        finalEstimate: null,
        currentStory: (state.currentStory - 1 + len) % len
      };
    }
    case "ADD_STORY": {
      return {
        ...state,
        stories: [...state.stories, action.payload]
      };
    }
    case "UPDATE_STORY": {
      return {
        ...state,
        stories: updateCurrentStory(state, "name", action.payload)
      };
    }
    case "UPDATE":
      // fire base not sending blank array and null values here in the payload
      // populate from initial state
      return {
        ...state,
        ...{ ...initialState, ...action.payload }
      };
    default:
      return { ...state };
  }
}

function calculateFinalEstimate(estimates) {
  const validEstimates = estimates
    .filter(estimate => estimate.value != null && !isNaN(estimate.value))
    .map(estimate => estimate.value);
  return Math.round(sum(validEstimates) / validEstimates.length) || 0;
}

function updateCurrentStory(state, prop, value) {
  return state.stories.map((story, i) => {
    if (i === state.currentStory) story[prop] = value;
    return story;
  });
}

export { useGameState as default };
