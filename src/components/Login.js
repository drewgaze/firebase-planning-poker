import React, { memo } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "config/firebase";
import { Redirect } from "react-router";
import useFirebaseAuth from "hooks/useFirebaseAuth";

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
};

const Login = memo(() => {
  const user = useFirebaseAuth();
  if (user) return <Redirect to="/new" />;
  return (
    <section className="hero is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container">
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      </div>
    </section>
  );
});

export { Login as default };
