import PropTypes from 'prop-types';

export default function CorrectWord({ word, show }) {
  if (!show) return null;
  
  return (
    <div className="text-white text-lg sm:text-xl md:text-2xl font-semibold">
      Correct word was: <span className="text-amber-400">{word}</span>
    </div>
  );
}

CorrectWord.propTypes = {
  word: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired
};