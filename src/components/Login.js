import React, { Component } from "react";
import { connect } from "react-redux";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "config/firebase";
import { Redirect } from "react-router";

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
};

class Login extends Component {
  render() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) return <Redirect to="/" />;
    return (
      <div>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ user: { isLoggedIn } }) => ({ isLoggedIn });

export default connect(mapStateToProps)(Login);
