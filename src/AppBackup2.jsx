import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

const WORD_LENGTH = 5;
const TOTAL_GUESSES = 6;

function App() {
  const [guessWords, setGuessWords] = useState(
    new Array(TOTAL_GUESSES).fill("     ")
  );
  const [correctWord, setCorrectWord] = useState("");
  const [correctLetterObject, setCorrectLetterObject] = useState({});
  const [wordCount, setWordCount] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [currentWord, setCurrentWord] = useState("     ");
  const [gameOver, setGameOver] = useState(false);

  async function fetchWord() {

    const response = await axios.get("https://api.datamuse.com/words?sp=?????&max=1000")
    const words = response.data
    const randomIndex = Math.floor(Math.random() * words.length)
    const word = words[randomIndex].word
    
    console.log(word)
    
    const letterObject = {};
    for (let letter of word) {
      letterObject[letter] = (letterObject[letter] || 0) + 1;
    }

    setCorrectWord(word);
    setCorrectLetterObject(letterObject);
  }
  // Getting correct word
  useEffect(() => {

    fetchWord();

  }, []);

  function handleEnter() {

    if (currentWord === correctWord) {
      setGameOver(true);
      alert("You have won");
      return;
    }

    if (currentWord !== correctWord && wordCount === TOTAL_GUESSES - 1) {
      setGameOver(true);
      alert("You have lost");
      return;
    }

    if (letterCount !== WORD_LENGTH) {
      alert("Please enter a 5 letter word");
      return;
    }

    setGuessWords((current) => {
      const updatedGuessWords = [...current];
      updatedGuessWords[wordCount] = currentWord;
      return updatedGuessWords;
    });

    setWordCount((current) => current + 1);
    setLetterCount(0);
    setCurrentWord("     ");
  }

  function handleBackspace() {
    if (letterCount === 0) {
      return;
    }
    setCurrentWord((currentWord) => {
      const currentWordArray = currentWord.split("");
      currentWordArray[letterCount - 1] = " ";
      const newWord = currentWordArray.join("");
      return newWord;
    });
    setLetterCount((currentCount) => currentCount - 1);
  }

  function handleAlphabet(key) {
    if (letterCount === WORD_LENGTH) {
      return;
    }
    setCurrentWord((currentWord) => {
      const currentWordArray = currentWord.split("");
      currentWordArray[letterCount] = key;
      const newWord = currentWordArray.join("");
      return newWord;
    });
    setLetterCount((currentCount) => currentCount + 1);
  }

  useEffect(() => {
    function handleKeydown(event) {
      if (event.key === "Enter") {
        handleEnter();
      } else if (event.key === "Backspace") {
        handleBackspace();
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        handleAlphabet(event.key);
      } else {
        return;
      }
    }

    document.addEventListener("keydown", handleKeydown);

    if (gameOver) {
      document.removeEventListener("keydown", handleKeydown);
      return;
    }

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [handleEnter, handleBackspace, handleAlphabet, gameOver]);

  useEffect(() => {
    console.log(currentWord);
  }, [currentWord]);

  function resetGame() {
    setGuessWords(new Array(TOTAL_GUESSES).fill("     "));
    setWordCount(0);
    setLetterCount(0);
    setCurrentWord("     ");
    setGameOver(false);
    fetchWord();
  }


  return (
    <div>
      <span className="text-8xl font-extrabold text-white">WORDLE!</span>
      {guessWords.map((word, index) => {
        if (index === wordCount) {
          return (
            <WordLine
              word={currentWord}
              correctWord={correctWord}
              correctLetterObject={correctLetterObject}
              revealed={false || gameOver}
              key={index}
            />
          );
        }
        return (
          <WordLine
            word={word}
            correctWord={correctWord}
            correctLetterObject={correctLetterObject}
            revealed={true}
            key={index}
          />
        );
      })}
      <button className="text-2xl font-bold text-white rounded-xl hover:bg-amber-200 hover:scale-120"
      onClick={(e) => { resetGame(); e.target.blur() }}>NEW GAME</button>
    </div>
  );
}

function WordLine({ word, correctWord, correctLetterObject, revealed }) {
  return (
    <div className="flex flex-row space-x-2 m-4">
      {word.split("").map((letter, index) => {
        const hasCorrectLocation = letter === correctWord[index];
        const hasCorrectLetter = letter in correctLetterObject;

        return (
          <LetterBox
            letter={letter}
            green={hasCorrectLocation && hasCorrectLetter && revealed}
            yellow={!hasCorrectLocation && hasCorrectLetter && revealed}
            key={index}
          />
        );
      })}
    </div>
  );
}

function LetterBox({ letter, green, yellow }) {
  return (
    <div
      className={`size-24 border-4 border-black bg-amber-200 text-black rounded-xl flex items-center justify-center text-4xl uppercase font-semibold ${
        green ? "bg-green-500" : yellow ? "bg-yellow-500" : ""
      }`}
    >
      {letter}
    </div>
  );
}

export default App;
