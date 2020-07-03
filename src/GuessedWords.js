import React from "react";
import languageContext from "./contexts/languageContext";
import stringModule from "./helpers/strings";
import guessedWordsContext from "./contexts/guessedWordsContext";

const GuessedWords = () => {
  const language = React.useContext(languageContext);
  const [guessedWords] = guessedWordsContext.useGuessedWords();
  // const guessedWords = [];

  let contents;
  if (guessedWords.length === 0) {
    contents = (
      <span data-test="guessed-instructions">
        {stringModule.getStringByLanguage(language, "guessPrompt")}
      </span>
    );
  } else {
    const guessedWordRows = guessedWords.map((word, index) => (
      <tr data-test="guessed-word" key={index}>
        <td>{word.guessedWord}</td>
        <td>{word.letterMatchCount}</td>
      </tr>
    ));
    contents = (
      <div data-test="guessed-words">
        <h3>
          {stringModule.getStringByLanguage(language, "guessedWords")}
        </h3>
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th>
                {stringModule.getStringByLanguage(
                  language,
                  "guessColumnHeader"
                )}
              </th>
              <th>
                {stringModule.getStringByLanguage(
                  language,
                  "matchingLettersColumnHeader"
                )}
              </th>
            </tr>
          </thead>
          <tbody>{guessedWordRows}</tbody>
        </table>
      </div>
    );
  }
  return <div data-test="component-guessed-words">{contents}</div>;
};

export default GuessedWords;
