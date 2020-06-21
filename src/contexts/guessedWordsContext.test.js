import React from "react";
import { shallow } from "enzyme";
import {
  useGuessedWords,
  GuessedWordsProvider
} from "./guessedWordsContext";

const FunctionalComponent = () => {
  useGuessedWords();
  return <div />;
};

test("useGuessedWords throws an Error when not wrapped in GuessedWordsProvider", () => {
  expect(() => shallow(<FunctionalComponent />)).toThrow(
    "useGuessedWords must be used within a GuessedWordsProvider"
  );
});

test("useGuessedWords does not throw error when not Wrapped in GuessedWordsProvider", () => {
  expect(() =>
    shallow(
      <GuessedWordsProvider>
        <FunctionalComponent />
      </GuessedWordsProvider>
    )
  ).not.toThrow(
    "useGuessedWords must be used within a GuessedWordsProvider"
  );
});
