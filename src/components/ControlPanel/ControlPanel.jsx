import React from "react";
import "./controlPanel.css";

const ControlPanel = (props) => {
  const resetGame = (e) => {
    e.preventDefault();
    props.resetGame();
  };

  return (
    <form className="control-panel">
      <button className="raised-borders" onClick={resetGame}>
        Reset Game
      </button>
    </form>
  );
};

export default ControlPanel;
