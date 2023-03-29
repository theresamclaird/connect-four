import React from "react";
import Grid from "../Grid";
import NewPlayerForm from "../NewPlayerForm";
import Players from "../Players";
import ControlPanel from "../ControlPanel";
import WinnerAnnouncement from "../WinnerAnnouncement";
import "./game.css";

const Game = (props) => {
  const { rows = 6, columns = 7 } = props;
  const [players, setPlayers] = React.useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = React.useState(0);
  const [isGridDisabled, setIsGridDisabled] = React.useState(false);
  const gridRef = React.useRef();
  const announcementRef = React.useRef();

  const addPlayer = (newPlayer) => {
    setPlayers([...players, newPlayer]);
  };

  const completeTurn = (isWinningState) => {
    if (isWinningState) {
      announcementRef.current.show();
      return;
    }

    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
  };

  const resetGame = () => {
    setCurrentPlayerIndex(0);
    gridRef.current.resetGrid();
    setIsGridDisabled(false);
  };

  return (
    <div className="connect-four">
      <div>
        <Grid
          columns={columns}
          completeTurn={completeTurn}
          currentPlayerColor={
            players.length === 0 ? undefined : players[currentPlayerIndex]
          }
          disable={isGridDisabled}
          ref={gridRef}
          rows={rows}
        />
        <ControlPanel resetGame={resetGame} />
      </div>
      <div className="player-container">
        <NewPlayerForm addPlayer={addPlayer} />
        <Players playerColors={players} />
      </div>
      <WinnerAnnouncement
        ref={announcementRef}
        player={players[currentPlayerIndex]}
      />
    </div>
  );
};

export default Game;

/* todo:
 *   1. Prevent coin drops after a win. (isGridDisabled?)
 *   2. Style the color select.
 *   3. Allow for different rules? see: https://en.wikipedia.org/wiki/Connect_Four
 *   4. Remove players.
 *   5. Reset players (remove all).
 *   6. Undo last move.
 *   7. Prevent coin drops until 2 or more players have selected their color.
 *   8. Play against an AI opponent.
 */
