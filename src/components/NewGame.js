import React, { useState, useRef, useCallback } from "react";
import StoryInput from "./StoryInput";
import useFirebaseAuth from "hooks/useFirebaseAuth";
import firebase from "config/firebase";

function NewGame({ history }) {
  const user = useFirebaseAuth();
  const [name, setName] = useState("");
  const [stories, setStories] = useState([]);
  const inputRef = useRef();

  const handleSubmit = useCallback(
    async evt => {
      evt.preventDefault();
      // TODO: validate form
      const key = await createGame(
        {
          name,
          stories: stories.map(story => ({ name: story }))
        },
        user
      );
      history.push(`/game/${key}`);
    },
    [history, inputRef, stories, user]
  );
  return (
    <section className="section is-fullheight">
      <div className="container">
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <h1 className="title">New Game</h1>
            <form>
              <div className="field">
                <label className="label">Game Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <StoryInput stories={stories} handleChange={setStories} />
              <div className="field">
                <button className="button is-link" type="submit" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

async function createGame(game, user) {
  const { displayName: name, uid } = user;
  const newGame = {
    ...game,
    host: { name, uid },
    players: [],
    estimates: [],
    currentStory: 0,
    showEstimates: false
  };
  const { key } = firebase
    .database()
    .ref("games")
    .push(newGame);
  return key;
}

export { NewGame as default };
