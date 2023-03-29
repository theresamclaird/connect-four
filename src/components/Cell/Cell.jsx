import React from "react";
import "./cell.css";

const Cell = (props) => {
  const { handleColumnClick, column, uniqueKey, color } = props;
  const handleClick = () => {
    handleColumnClick(column);
  };

  return (
    <td key={uniqueKey} className={"cell " + color} onClick={handleClick}></td>
  );
};

export default Cell;
