import React from "react";
import "./newPlayerForm.css";

const NewPlayerForm = (props) => {
  const [selectedColorValue, setSelectedColorValue] = React.useState("");
  const [availableColors, setAvailableColors] = React.useState([
    "red",
    "yellow",
    "blue",
    "orange",
    "green",
    "violet",
    "black"
  ]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.addPlayer(selectedColorValue);
    setAvailableColors(
      availableColors.filter((color) => color !== selectedColorValue)
    );
    setSelectedColorValue("");
  };

  const handleColorChange = (e) => {
    setSelectedColorValue(e.target.value);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <select name="colors" onChange={handleColorChange}>
        <option value="" key="default">
          Choose a color
        </option>
        {availableColors.map((color) => (
          <option value={color} key={color}>
            {color}
          </option>
        ))}
      </select>
      <button className="add-player raised-borders" type="submit">
        Add Player
      </button>
    </form>
  );
};

export default NewPlayerForm;
