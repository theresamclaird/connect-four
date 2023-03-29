import React from "react";
import "./winnerAnnouncement.css";

const WinnerAnnouncement = React.forwardRef((props, ref) => {
  const { player } = props;
  const [isVisible, setIsVisible] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    show() {
      setIsVisible(true);
    }
  }));

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <p>The winner is {player}!</p>
      </div>
    </div>
  );
});

export default WinnerAnnouncement;
