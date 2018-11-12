import React from "react";
import "./App.css";
import "sass/app.scss";
import "material-icons/iconfont/material-icons.css";
import Nav from "./components/Nav";
import Routes from "./components/Routes";
import { withRouter } from "react-router";

const App = () => (
  <div className="App">
    <Nav />
    <Routes />
  </div>
);

export default withRouter(App);
