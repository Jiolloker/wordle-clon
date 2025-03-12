import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function ScoreBoard({ score }) {
  return (
    <div className="text-white text-xl sm:text-2xl md:text-3xl font-bold bg-amber-600/20 px-4 py-2 rounded-lg">
      Score: {score}
    </div>
  );
}

ScoreBoard.propTypes = {
  score: PropTypes.number.isRequired
};