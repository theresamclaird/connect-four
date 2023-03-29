import React from "react";
import "./players.css";

const Players = (props) => {
  return (
    <ol>
      {props.playerColors.map((color) => (
        <li key={color}>{color}</li>
      ))}
    </ol>
  );
};

export default Players;
