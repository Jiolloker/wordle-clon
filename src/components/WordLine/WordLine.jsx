import LetterBox from "../LetterBox/LetterBox";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

function WordLine({ word, correctWord, correctLetterObject, revealed }) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const isCorrectWord = word === correctWord;

  useEffect(() => {
    if (revealed && isCorrectWord) {
      setShouldAnimate(true);
      // Reset animation after all letters have bounced
      const totalDelay = 1000; // Total time for all animations to complete
      const timer = setTimeout(() => setShouldAnimate(false), totalDelay);
      return () => clearTimeout(timer);
    }
  }, [revealed, isCorrectWord]);

  return (
    <div className="flex flex-row space-x-1 sm:space-x-2 m-1 sm:m-2">
      {word.split("").map((letter, index) => {
        const hasCorrectLocation = letter === correctWord[index];
        const hasCorrectLetter = letter in correctLetterObject;

        return (
          <LetterBox
            key={index}
            letter={letter}
            green={hasCorrectLocation && hasCorrectLetter && revealed}
            yellow={!hasCorrectLocation && hasCorrectLetter && revealed}
            shouldAnimate={shouldAnimate}
            animationDelay={index * 100} // 100ms delay between each letter
          />
        );
      })}
    </div>
  );
}

WordLine.propTypes = {
  word: PropTypes.string.isRequired,
  correctWord: PropTypes.string.isRequired,
  correctLetterObject: PropTypes.object.isRequired,
  revealed: PropTypes.bool.isRequired
};

export default WordLine;