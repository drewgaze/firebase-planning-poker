import React from "react";
import { Switch, Route } from "react-router-dom";
import NewGame from "./NewGame";
import Game from "./Game";
import Login from "./Login";

export default () => (
  <>
    <div className="h-100">
      <Switch>
        <Route exact path="/new" component={NewGame} />
        <Route exact path="/game/:gameKey" component={Game} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
    <div className="border-top">
      made with{" "}
      <span className="text-danger small-icon material-icons">favorite</span> by{" "}
      <a href="https://github.com/drewgaze">@drewgaze</a>
    </div>
  </>
);
