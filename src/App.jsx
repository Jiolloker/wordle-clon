import { useEffect } from "react";
import GameBoard from "./components/GameBoard/GameBoard";
import Title from "./components/Title/Title";
import NewGameButton from "./components/NewGameButton/NewGameButton";
import useGameLogic from "./hooks/useGameLogic";
import "./App.css";
import ScoreBoard from "./components/ScoreBoard/ScoreBoard";
import CorrectWord from "./components/CorrectWord/CorrectWord";

function App() {
  const {
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
  } = useGameLogic();

  useEffect(() => {
    if (gameOver) {
      document.removeEventListener("keydown", handleKeydown);
      return;
    }
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown, gameOver]);

  return (
    <div className="min-h-screen w-full bg-gray-900 flex flex-col items-center justify-start py-8 px-4 gap-8 sm:py-12">
      <Title />
      <ScoreBoard score={score} />
      <GameBoard
        guessWords={guessWords}
        correctWord={correctWord}
        correctLetterObject={correctLetterObject}
        wordCount={wordCount}
        currentWord={currentWord}
        gameOver={gameOver}
      />
      <CorrectWord word={correctWord} show={hasLost} />
      <NewGameButton onReset={resetGame} />
    </div>
  );
}

export default App;
