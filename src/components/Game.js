import React from "react";

export default ({
  match: {
    params: { gameKey }
  }
}) => <div>game key is {gameKey}</div>;
