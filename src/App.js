import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/Nav";
import Routes from "./components/Routes";
import firebase from "config/firebase";
import { login, logout } from "actions/userActions";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "redux";

class App extends Component {
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      user
        ? this.props.dispatch(login({ name: user.displayName, uid: user.uid }))
        : this.props.dispatch(logout());
    });
  }
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
  render() {
    return (
      <div className="App">
        <Nav />
        <Routes />
      </div>
    );
  }
}

export default compose(
  withRouter,
  connect()
)(App);
