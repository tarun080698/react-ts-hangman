import React from "react";
import "./keyboard.css";
const allLetters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

type HangmanKeyboardProps = {
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetter: (letter: string) => void;
  disableKeys: boolean;
};

function UserKeyboard({
  activeLetters,
  inactiveLetters,
  addGuessedLetter,
  disableKeys = false,
}: HangmanKeyboardProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(80px,1fr))",
        gap: "0.5rem",
      }}
    >
      {allLetters.map((letter, index) => {
        letter = letter.toLowerCase();
        const isActive = activeLetters.includes(letter);
        const inActive = inactiveLetters.includes(letter);

        return (
          <button
            className={`btn${isActive ? " active" : ""}${
              inActive ? " inactive" : ""
            }`}
            key={index}
            onClick={() => addGuessedLetter(letter)}
            disabled={inActive || isActive || disableKeys}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}

export default UserKeyboard;
