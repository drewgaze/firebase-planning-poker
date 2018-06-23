import React from "react";
import { Switch, Route } from "react-router-dom";
import NewGame from "./NewGame";

export default () => (
  <Switch>
    <Route exact path="/new" component={NewGame} />
  </Switch>
);
