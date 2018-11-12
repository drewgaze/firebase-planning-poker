import React, { useEffect, useMemo } from "react";
import StoryTitle from "./StoryTitle";
import Estimate from "./Estimate";
import HostControls from "./HostControls";
import EstimateCards from "./EstimateCards";
import Player from "./Player";
import Stories from "./Stories";
import useFirebaseAuth from "hooks/useFirebaseAuth";
import useGameState from "hooks/useGameState";

const Game = props => {
  const user = useFirebaseAuth();
  const [game, dispatch, isReady] = useGameState(props.match.params.gameKey);

  const { players, estimates, showEstimates, host, stories, currentStory: index } = game;

  const isHost = useMemo(() => user && host && user.uid === host.uid, [user, host]);
  const currentStory = useMemo(() => (stories.length > 0 ? stories[index] : null), [
    index,
    stories
  ]);

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
    <div className="columns fill is-marginless">
      <div className="column is-3 is-hidden-mobile has-border-right has-background-light has-left-padding">
        <aside>
          <label className="label">Players</label>
          <ul className="list has-background-light">
            {players.map(player => (
              <Player
                isHost={host.uid === player.uid}
                player={player}
                key={player.uid}
                showEstimates={showEstimates}
                estimates={estimates}
              />
            ))}
          </ul>
        </aside>
      </div>
      <div className="column is-6 has-background-grey-light">
        <div className="columns">
          <div className="column">
            <StoryTitle isHost={isHost} story={currentStory} dispatch={dispatch} />
          </div>
          <div className="column">
            <Estimate estimate={currentStory && currentStory.estimate} />
          </div>
        </div>
        {isHost && <HostControls dispatch={dispatch} disabled={estimates.length <= 0} />}
        <EstimateCards
          dispatch={dispatch}
          uid={user && user.uid}
          showEstimates={showEstimates}
          estimates={estimates}
        />
      </div>
      <div className="column is-3 is-hidden-mobile has-border-left has-background-light has-right-padding">
        <asice>
          <label className="label">Stories</label>
          <Stories stories={stories} currentStory={index} showEstimates={showEstimates} />
        </asice>
      </div>
    </div>
  );
};

export { Game as default };
