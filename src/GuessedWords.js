import React from "react";
import PropTypes from "prop-types";
import languageContext from "./contexts/languageContext";
import stringModule from "./helpers/strings";

const GuessedWords = (props) => {
  const language = React.useContext(languageContext);

  let contents;
  if (props.guessedWords.length === 0) {
    contents = (
      <span data-test="guessed-instructions">
        {stringModule.getStringByLanguage(language, "guessPrompt")}
      </span>
    );
  } else {
    const guessedWordRows = props.guessedWords.map((word, index) => (
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

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letterMatchCount: PropTypes.number.isRequired
    }).isRequired
  )
};

export default GuessedWords;
