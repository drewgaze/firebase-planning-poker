import React from "react";
import { Switch, Route } from "react-router-dom";
import NewGame from "./NewGame";
import Game from "./Game";
import Login from "./Login";

export default () => (
  <>
    <section className="hero is-fullheight-with-navbar">
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <section className="hero is-fullheight-with-navbar is-info is-bold">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">Welcome to Planning Poker</h1>
                  <h2 className="subtitle">
                    Log in to start a new game. <br /> Send the game's URL to your teammates to
                    invite them to play.
                  </h2>
                </div>
              </div>
            </section>
          )}
        />
        <Route exact path="/new" component={NewGame} />
        <Route exact path="/game/:gameKey" component={Game} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </section>
    <footer className="footer has-background-light has-border-top">
      <div className="content has-text-centered">
        <p>
          made with <span className="has-text-danger material-icons">favorite</span> by{" "}
          <a href="https://github.com/drewgaze">@drewgaze</a>
        </p>
      </div>
    </footer>
  </>
);
