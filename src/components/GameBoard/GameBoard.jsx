import WordLine from "../WordLine/WordLine";
import PropTypes from "prop-types";

function GameBoard({ guessWords, correctWord, correctLetterObject, wordCount, currentWord, gameOver }) {
  return (
    <div className="flex flex-col items-center">
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
    </div>
  );
}

GameBoard.propTypes = {
  guessWords: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctWord: PropTypes.string.isRequired,
  correctLetterObject: PropTypes.object.isRequired,
  wordCount: PropTypes.number.isRequired,
  currentWord: PropTypes.string.isRequired,
  gameOver: PropTypes.bool.isRequired
};

export default GameBoard;