import React, { createContext, useContext } from "react";

// no default value
const guessedWordsContext = createContext();

/**
 * @function useGuessedWords
 * @returns {Array} guessedWordsContext value, which is state of [value, setter].
 */
export function useGuessedWords() {
  const context = useContext(guessedWordsContext);

  if (!context) {
    throw new Error(
      "useGuessedWords must be used within a GuessedWordsProvider"
    );
  }

  return context;
}

/**
 * @function GuessedWordsProvider
 * @param {object} props
 * @returns {JSX.Element}
 */
export function GuessedWordsProvider(props) {
  const [guessedWords, setGuessedWords] = useState([]);

  const value = useMemo(() => [guessedWords, setGuessedWords], [
    guessedWords
  ]);
  return <guessedWordsContext.Provider value={value} {...props} />;
}
