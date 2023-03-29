import React from "react";
import Cell from "../Cell";
import "./grid.css";

const Grid = React.forwardRef((props, ref) => {
  const { columns, rows, currentPlayerColor, completeTurn, disable } = props;
  const getEmptyGrid = () => {
    var gridData = [],
      columnIndex;

    for (columnIndex = 0; columnIndex < columns; columnIndex++) {
      gridData.push([]);
    }
    return gridData;
  };

  const [gridData, setGridData] = React.useState(getEmptyGrid());

  React.useImperativeHandle(ref, () => ({
    resetGrid() {
      setGridData(getEmptyGrid());
    }
  }));

  const isWinningState = () => {
    var rowIndex, columnIndex;

    // todo This can be optimized by only checking for a winning state relative to the position of the last coin that was dropped.
    for (columnIndex = 0; columnIndex < columns; columnIndex++) {
      for (rowIndex = 0; rowIndex < rows; rowIndex++) {
        const populatedBy = gridData[columnIndex][rowIndex];

        if (populatedBy !== undefined) {
          // Check for horizontal win.
          if (
            columnIndex < columns - 3 &&
            gridData[columnIndex + 1][rowIndex] === populatedBy &&
            gridData[columnIndex + 2][rowIndex] === populatedBy &&
            gridData[columnIndex + 3][rowIndex] === populatedBy
          ) {
            return true;
          }

          // Check for vertical win.
          if (
            gridData[columnIndex].length > 3 &&
            rowIndex < rows - 3 &&
            gridData[columnIndex][rowIndex + 1] === populatedBy &&
            gridData[columnIndex][rowIndex + 2] === populatedBy &&
            gridData[columnIndex][rowIndex + 3] === populatedBy
          ) {
            return true;
          }

          // Check for diagonal win (bottom-left to upper-right).
          if (
            rowIndex < rows - 3 &&
            columnIndex < columns - 3 &&
            gridData[columnIndex + 1][rowIndex + 1] === populatedBy &&
            gridData[columnIndex + 2][rowIndex + 2] === populatedBy &&
            gridData[columnIndex + 3][rowIndex + 3] === populatedBy
          ) {
            return true;
          }

          // Check for diagonal win (upper-left to bottom-right).
          if (
            rowIndex > 2 &&
            columnIndex < columns - 3 &&
            gridData[columnIndex + 1][rowIndex - 1] === populatedBy &&
            gridData[columnIndex + 2][rowIndex - 2] === populatedBy &&
            gridData[columnIndex + 3][rowIndex - 3] === populatedBy
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const dropPiece = (column, color) => {
    var newGridData = {};
    newGridData[column] = gridData[column] || [];

    if (newGridData[column].length > rows - 1) {
      return;
    }

    newGridData[column].push(color);
    setGridData({ ...gridData, ...newGridData });
    completeTurn(isWinningState());
  };

  const handleColumnClick = (column) => {
    if (!disable && currentPlayerColor) {
      dropPiece(column, currentPlayerColor);
    }
  };

  const buildRowElements = () => {
    var rowIndex,
      columnIndex,
      rowElements = [];

    for (rowIndex = rows - 1; rowIndex >= 0; rowIndex--) {
      var cells = [];

      for (columnIndex = 0; columnIndex < columns; columnIndex++) {
        const key = ["row", rowIndex, "column", columnIndex].join("");
        cells.push(
          <Cell
            row={rowIndex}
            column={columnIndex}
            handleColumnClick={handleColumnClick}
            color={gridData[columnIndex][rowIndex]}
            key={key}
            uniqueKey={key}
          />
        );
      }
      rowElements.push(<tr key={rowIndex}>{cells}</tr>);
    }
    return rowElements;
  };

  return (
    <div className="grid-container">
      <table className="grid raised-borders">
        <tbody>{buildRowElements()}</tbody>
      </table>
    </div>
  );
});

export default Grid;
