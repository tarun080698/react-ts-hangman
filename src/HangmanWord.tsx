import React from "react";

type HangmanWordsProps = {
  guessedLetters: string[];
  wordToGuess: string;
  revealWord: boolean;
};

function HangmanWord({
  guessedLetters,
  wordToGuess,
  revealWord = false,
}: HangmanWordsProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: "6rem",
        textTransform: "capitalize",
        fontWeight: "bolder",
        fontFamily: "monospace",
      }}
    >
      {wordToGuess.split("").map((letter, index) => (
        <span
          style={{
            borderBottom: ".1em solid black",
          }}
          key={index}
        >
          <span
            style={{
              visibility:
                guessedLetters.includes(letter) || revealWord
                  ? "visible"
                  : "hidden",
              color:
                !guessedLetters.includes(letter) && revealWord
                  ? "red"
                  : "black",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
}

export default HangmanWord;
