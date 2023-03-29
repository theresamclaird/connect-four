import React from "react";
import Game from "./components/Game";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Game rows={6} columns={7} />
    </div>
  );
}
