import React from "react";
import words from "./wordlist.json";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import UserKeyboard from "./UserKeyboard";

function App() {
  const resetWord = () => {
    setGuessedLetters([]);
    setWordToGuess(words[Math.floor(Math.random() * words.length)]);
  };

  const [wordToGuess, setWordToGuess] = React.useState<string>(
    () => words[Math.floor(Math.random() * words.length)]
  );
  const [guessedLetters, setGuessedLetters] = React.useState<string[]>([]);

  const inCorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = inCorrectLetters.length >= 6;

  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = React.useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isWinner || isLoser) return;
      setGuessedLetters((guessedLetters) => [...guessedLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;
      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  return (
    <div className="App">
      <div
        style={{
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          margin: "0 auto",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "2rem",
            textAlign: "center",
          }}
        >
          <div>Let's begin!</div>
          {isWinner ? "You WON!" : isLoser ? "You Lost!" : ""}
          <div>
            <button onClick={resetWord}>Play again</button>
          </div>
        </div>
        <HangmanDrawing numberOfGuesses={inCorrectLetters.length} />
        <HangmanWord
          guessedLetters={guessedLetters}
          wordToGuess={wordToGuess}
          revealWord={isLoser}
        />
        <div style={{ alignSelf: "stretch" }}>
          <UserKeyboard
            activeLetters={guessedLetters.filter((letter) =>
              wordToGuess.includes(letter)
            )}
            inactiveLetters={inCorrectLetters}
            addGuessedLetter={addGuessedLetter}
            disableKeys={isWinner || isLoser}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
