import React from 'react';

interface KeyboardProps {
  onGuess: (letter: string) => void;
  guessedLetters: string[];
  disabled?: boolean;
}

const Keyboard: React.FC<KeyboardProps> = ({ onGuess, guessedLetters }) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  return (
    <div>
      {alphabet.map(letter => (
        <button
          key={letter}
          onClick={() => onGuess(letter)}
          disabled={guessedLetters.includes(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;