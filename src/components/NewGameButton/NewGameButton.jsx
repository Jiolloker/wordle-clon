import PropTypes from "prop-types";

export default function NewGameButton({ onReset }) {
  return (
    <button 
      className="inline-flex items-center justify-center px-6 py-3 text-lg sm:text-xl md:text-2xl font-bold text-white bg-amber-600 hover:bg-amber-500 rounded-lg sm:rounded-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400"
      onClick={(e) => { onReset(); e.target.blur(); }}
    >
      NEW GAME
    </button>
  );
}

NewGameButton.propTypes = {
  onReset: PropTypes.func.isRequired
};