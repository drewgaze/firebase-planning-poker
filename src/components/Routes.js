import React from "react";
import { Switch, Route } from "react-router-dom";
import NewGame from "./NewGame";
import Game from "./Game";

export default () => (
  <Switch>
    <Route exact path="/new" component={NewGame} />
    <Route exact path="/game/:gameKey" component={Game} />
  </Switch>
);
