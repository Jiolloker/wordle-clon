import PropTypes from "prop-types";
import { useState, useEffect } from "react";

function LetterBox({ letter, green, yellow, shouldAnimate, animationDelay }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (shouldAnimate) {
      const timer = setTimeout(() => {
        setAnimate(true);
        // Remove animation class after it completes
        setTimeout(() => setAnimate(false), 1000);
      }, animationDelay);
      return () => clearTimeout(timer);
    }
  }, [shouldAnimate, animationDelay]);

  return (
    <div
      className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-2 sm:border-4 border-gray-700 bg-amber-200 text-black rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-2xl md:text-4xl uppercase font-semibold ${
        green ? "bg-green-500" : yellow ? "bg-yellow-500" : ""
      } ${animate ? "animate-bounce" : ""} transition-colors duration-300`}
    >
      {letter}
    </div>
  );
}

LetterBox.propTypes = {
  letter: PropTypes.string.isRequired,
  green: PropTypes.bool,
  yellow: PropTypes.bool,
  shouldAnimate: PropTypes.bool,
  animationDelay: PropTypes.number
};

LetterBox.defaultProps = {
  green: false,
  yellow: false,
  shouldAnimate: false,
  animationDelay: 0
};

export default LetterBox;