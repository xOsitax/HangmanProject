import React from "react";
import "./VirtualKeyboard.css";
const VirtualKeyboard = ({ onKeyPress }) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const firstRow = alphabet.slice(0, 15);  
  const secondRow = alphabet.slice(15);  


  const handleClick = (letter) => {
    onKeyPress(letter);
  };

  return (
    <div className="virtual-keyboard">
      <div className="keyboard-row">
        {firstRow.map((letter) => (
          <button
            key={letter}
            className="key"
            onClick={() => handleClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="keyboard-row">
        {secondRow.map((letter) => (
          <button
            key={letter}
            className="key"
            onClick={() => handleClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VirtualKeyboard;