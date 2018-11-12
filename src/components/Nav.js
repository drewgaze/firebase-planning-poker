import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "config/firebase";
import useFirebaseAuth from "hooks/useFirebaseAuth";

const Navigation = () => {
  const user = useFirebaseAuth();
  const [isActive, setIsActive] = useState(false);
  const activeClass = isActive ? "is-active" : "";

  return (
    <nav className="navbar is-dark" role="navigation" aria-label="main-navigation">
      <div class="navbar-brand">
        <Link className="navbar-item" to="/">
          Planning Poker
        </Link>
        <a
          role="button"
          onClick={() => setIsActive(!isActive)}
          className={"navbar-burger " + activeClass}
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div className={"navbar-menu " + activeClass}>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {user && (
                <Link className="button is-primary" to="/new">
                  New Game
                </Link>
              )}
              {!user && (
                <Link className="button is-primary" to="/login">
                  Log in
                </Link>
              )}
            </div>
          </div>
          {user && (
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">{user.displayName}</a>
              <div class="navbar-dropdown">
                <a class="navbar-item" onClick={() => firebase.auth().signOut()}>
                  Log out
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export { Navigation as default };
