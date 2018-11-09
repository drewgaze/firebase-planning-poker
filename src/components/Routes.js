import React from "react";
import { Switch, Route } from "react-router-dom";
import NewGame from "./NewGame";
import Game from "./Game";
import Login from "./Login";

export default () => (
  <>
    <div className="h-100">
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <div className="my-2">
              <h3>Welcome to Planning Poker</h3>
              <p>
                Log in to start a new game. <br /> Send the game's URL to your
                teammates to invite them to play.
              </p>
            </div>
          )}
        />
        <Route exact path="/new" component={NewGame} />
        <Route exact path="/game/:gameKey" component={Game} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
    <div className="border-top">
      <div className="my-2">
        made with{" "}
        <span className="text-danger small-icon material-icons">favorite</span>{" "}
        by <a href="https://github.com/drewgaze">@drewgaze</a>
      </div>
    </div>
  </>
);
