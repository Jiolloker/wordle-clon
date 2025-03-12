import { useState, useEffect, useCallback } from "react";
import { WORD_LENGTH, TOTAL_GUESSES, WORD_LIST } from "../constants";
import useScore from './useScore';

export default function useGameLogic() {
  const [guessWords, setGuessWords] = useState(new Array(TOTAL_GUESSES).fill("     "));
  const [correctWord, setCorrectWord] = useState("");
  const [correctLetterObject, setCorrectLetterObject] = useState({});
  const [wordCount, setWordCount] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [currentWord, setCurrentWord] = useState("     ");
  const [gameOver, setGameOver] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const { score, increaseScore, decreaseScore } = useScore();

  const fetchWord = useCallback(() => {
    // Get a random word from our local word list
    const words = WORD_LIST.words;
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
    
    console.log(word);
    
    const letterObject = {};
    for (let letter of word) {
      letterObject[letter] = (letterObject[letter] || 0) + 1;
    }
    
    setCorrectWord(word);
    setCorrectLetterObject(letterObject);
  }, []);

  useEffect(() => {
    fetchWord();
  }, [fetchWord]);

  const handleEnter = useCallback(() => {
    if (currentWord === correctWord) {
      setGameOver(true);
      setHasLost(false);
      increaseScore();
      alert("You have won!");
      return;
    }

    if (currentWord !== correctWord && wordCount === TOTAL_GUESSES - 1) {
      setGameOver(true);
      setHasLost(true);
      decreaseScore();
      alert("You have lost!");
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
  }, [currentWord, correctWord, wordCount, letterCount, increaseScore, decreaseScore]);

  const handleBackspace = useCallback(() => {
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
  }, [letterCount]);

  const handleAlphabet = useCallback((key) => {
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
  }, [letterCount]);

  const handleKeydown = useCallback((event) => {
    if (event.key === "Enter") {
      handleEnter();
    } else if (event.key === "Backspace") {
      handleBackspace();
    } else if (/^[a-zA-Z]$/.test(event.key)) {
      handleAlphabet(event.key);
    }
  }, [handleEnter, handleBackspace, handleAlphabet]);

  const resetGame = useCallback(() => {
    setGuessWords(new Array(TOTAL_GUESSES).fill("     "));
    setWordCount(0);
    setLetterCount(0);
    setCurrentWord("     ");
    setGameOver(false);
    setHasLost(false);
    fetchWord();
  }, [fetchWord]);

  return {
    guessWords,
    correctWord,
    correctLetterObject,
    wordCount,
    currentWord,
    gameOver,
    handleKeydown,
    resetGame,
    score,
    hasLost
  };
}
