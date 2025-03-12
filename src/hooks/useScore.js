import { useState, useEffect } from 'react';

const MAX_SCORE = 99999;
const SCORE_CHANGE = 100;
const STORAGE_KEY = 'wordleScore';
const EXPIRY_KEY = 'wordleScoreExpiry';
const EXPIRY_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

export default function useScore() {
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem(STORAGE_KEY);
    const expiryTime = localStorage.getItem(EXPIRY_KEY);
    
    if (savedScore && expiryTime) {
      if (Date.now() < parseInt(expiryTime)) {
        return parseInt(savedScore);
      }
    }
    return 0;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, score.toString());
    localStorage.setItem(EXPIRY_KEY, (Date.now() + EXPIRY_TIME).toString());
  }, [score]);

  const increaseScore = () => {
    setScore(prev => Math.min(prev + SCORE_CHANGE, MAX_SCORE));
  };

  const decreaseScore = () => {
    setScore(prev => Math.max(prev - SCORE_CHANGE, 0));
  };

  return { score, increaseScore, decreaseScore };
}