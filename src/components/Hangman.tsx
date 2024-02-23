import React, { useState, useEffect } from 'react';
import WordDisplay from './WordDisplay';
import Keyboard from './Keyboard';

type CategoryWords = {
  [category: string]: string[];
};

const categories: CategoryWords = {
  Pays: ["France", "Brésil", "Canada", "Japon", "Italie", "Allemagne", "Espagne"],
  Animal: ["Chien", "Chat", "Girafe", "Éléphant", "Lion", "Tigre", "Panda"],
  Manga: ["Naruto", "One Piece", "Bleach", "Dragon Ball", "Death Note", "Attack on Titan", "My Hero Academia"],
  Nourriture: ["Pizza", "Sushi", "Hamburger", "Spaghetti", "Curry", "Tacos", "Salade"]
};

const Hangman: React.FC = () => {
  const [category, setCategory] = useState<string>('');
  const [word, setWord] = useState<string>('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const maxMistakes = 7;

  useEffect(() => {
    resetGame(); 
  }, []);

  const resetGame = () => {
    const categoryNames = Object.keys(categories);
    const randomCategory = categoryNames[Math.floor(Math.random() * categoryNames.length)];
    const randomWord = categories[randomCategory][Math.floor(Math.random() * categories[randomCategory].length)];

    setCategory(randomCategory);
    setWord(randomWord.toLowerCase());
    setGuessedLetters([]);
    setMistakes(0);
  };

  const handleLetterGuess = (letter: string) => {
    if (mistakes < maxMistakes && !guessedLetters.includes(letter)) {
      if (!word.includes(letter)) {
        setMistakes(mistakes + 1);
      }
      setGuessedLetters([...guessedLetters, letter]);
    }
  };

  const gameLost = mistakes >= maxMistakes;
  const gameWon = word.split('').every(letter => guessedLetters.includes(letter));

  return (
    <div>
      <h1>Jeu du Pendu</h1>
      <h2>Catégorie: {category}</h2>
      <WordDisplay word={word} guessedLetters={guessedLetters} />
      {!gameLost ? (
        <Keyboard onGuess={handleLetterGuess} guessedLetters={guessedLetters} disabled={gameWon || gameLost} />
      ) : (
        <p>Vous avez perdu. Le mot était : {word}</p>
      )}
      <button onClick={resetGame}>Rejouer</button>
      <p>Chances restantes : {maxMistakes - mistakes}</p>
      {gameWon && <p>Félicitations ! Vous avez trouvé le mot !</p>}
    </div>
  );
};

export default Hangman;