import React from 'react';

interface WordDisplayProps {
  word: string;
  guessedLetters: string[];
}

const WordDisplay: React.FC<WordDisplayProps> = ({ word, guessedLetters }) => {
  const displayedWord = word.split('').map(letter => guessedLetters.includes(letter) ? letter : '_').join(' ');

  return <div>{displayedWord}</div>;
};

export default WordDisplay;