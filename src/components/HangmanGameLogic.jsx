import React, { useState, useEffect } from "react";
import VirtualKeyboard from "./VirtualKeyboard";
import "./HangmanGameLogic.css";
import { useNavigate } from "react-router-dom";
import "./Api";
// Import hangman images
import hangman0 from "../assets/images/hangman0.svg";
import hangman1 from "../assets/images/hangman1.svg";
import hangman2 from "../assets/images/hangman2.svg";
import hangman3 from "../assets/images/hangman3.svg";
import hangman4 from "../assets/images/hangman4.svg";
import hangman5 from "../assets/images/hangman5.svg";
import hangman6 from "../assets/images/hangman6.svg";
import hangman7 from "../assets/images/hangman7.svg";

const hangmanImages = [
  hangman0,
  hangman1,
  hangman2,
  hangman3,
  hangman4,
  hangman5,
  hangman6,
  hangman7,
];

const HangmanGameLogic = () => {
  const [word, setWord] = useState("");
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [remainingGuesses, setRemainingGuesses] = useState(8);
  const [gameStatus, setGameStatus] = useState("playing");
  const [loading, setLoading] = useState(true);

  const fetchRandomWord = async () => {
    try {
      const response = await fetch(
        "https://random-word-api.vercel.app/api?words=1"
      );
      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error("Error fetching word:", error);
      return null;
    }
  };

  const initializeGame = async () => {
    setLoading(true);
    const randomWord = await fetchRandomWord();
    if (randomWord) {
      setWord(randomWord.toUpperCase());
      setCorrectLetters([]);
      setWrongLetters([]);
      setRemainingGuesses(8);
      setGameStatus("playing");
    }
    setLoading(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleGuess = (letter) => {
    if (
      gameStatus !== "playing" ||
      !letter ||
      letter.length !== 1 ||
      !/^[a-zA-Z]$/.test(letter)
    ) {
      return;
    }

    letter = letter.toUpperCase();

    if (correctLetters.includes(letter) || wrongLetters.includes(letter)) {
      return;
    }

    if (word.includes(letter)) {
      setCorrectLetters((prev) => [...prev, letter]);
    } else {
      setWrongLetters((prev) => [...prev, letter]);
      setRemainingGuesses((prev) => Math.max(prev - 1, 0));
    }
  };

  useEffect(() => {
    if (loading || word === "") return;

    const wordLetters = [...new Set(word.split(""))];
    const hasWon = wordLetters.every((letter) =>
      correctLetters.includes(letter)
    );

    if (hasWon) {
      setGameStatus("won");
    } else if (remainingGuesses === 0) {
      setGameStatus("lost");
    }
  }, [correctLetters, remainingGuesses, word, loading]);

  const resetGame = async () => {
    await initializeGame();
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");

    navigate("/login");
  };

  const displayWord = word
    .split("")
    .map((letter) => (correctLetters.includes(letter) ? letter : "_"))
    .join(" ");

  const getHangmanPartClass = (index) => {
    switch (index) {
      case 0:
        return "rope";
      case 1:
        return "head";
      case 2:
        return "eyes";
      case 3:
        return "body";
      case 4:
        return "left-arm";
      case 5:
        return "right-arm";
      case 6:
        return "left-leg";
      case 7:
        return "right-leg";
      default:
        return "";
    }
  };

  if (loading) return <div className="loading">Loading word...</div>;

  return (
    <div className="game-container">
      <h1 className="game-title">Hangman Game</h1>

      <div className="gamecontent">
        <div className="game-left">
          <p className="worddisplay">Word to Guess: {displayWord}</p>
          <p className="remainingattempts">
            Remaining Attempts: {remainingGuesses}
          </p>
          <p className="gamestatus">
            Status:{" "}
            {gameStatus === "playing"
              ? "Keep Trying"
              : gameStatus === "won"
              ? "You Won!"
              : `Game Over --   The word was ${word}`}
          </p>
          <p className="wrongletters">
            Wrong Letters: {wrongLetters.join(", ")}
          </p>

          {gameStatus === "playing" && (
            <VirtualKeyboard onKeyPress={handleGuess} />
          )}

          {gameStatus !== "playing" && (
            <button onClick={resetGame} className="play-button">
              Play Again
            </button>
          )}

          <div className="logout-container">
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>

        <div
  className={`game-right hangman-images ${
    gameStatus === "lost" ? "swing-animation" : ""
  }`}
>
          {hangmanImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Hangman part ${index}`}
              className={`hangman-step ${
                index < 8 - remainingGuesses ? "visible" : "hidden"
              } ${getHangmanPartClass(index)}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HangmanGameLogic;
