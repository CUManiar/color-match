import React from "react";
import "./App.scss";
import GameWindow from "./game-console/GameWindow";
import ScoreWindow from "./score-console/ScoreWindow";

function App() {
  return (
    <div className="App">
      <h1> Welcome to Color Match Game</h1> <hr />
      <GameWindow />
      <ScoreWindow />
    </div>
  );
}

export default App;
