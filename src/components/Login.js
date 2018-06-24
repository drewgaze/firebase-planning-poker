import React, { Component } from "react";
import { connect } from "react-redux";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "config/firebase";
import { login, logout } from "actions/userActions";

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
};

class Login extends Component {
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      user ? this.props.dispatch(login(user)) : this.props.dispatch(logout());
    });
  }
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
  render() {
    return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />;
  }
}

export default connect()(Login);
