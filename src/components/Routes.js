import React from "react";
import { Switch, Route } from "react-router-dom";
import NewGame from "./NewGame";
import Game from "./Game";
import Login from "./Login";

export default () => (
  <Switch>
    <Route exact path="/new" component={NewGame} />
    <Route exact path="/game/:gameKey" component={Game} />
    <Route exact path="/login" component={Login} />
  </Switch>
);
