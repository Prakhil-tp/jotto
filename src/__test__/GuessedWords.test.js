import React from "react";
import { shallow, mount } from "enzyme";
import GuessedWords from "../GuessedWords";
import { findByTestAttr } from "test/testUtils";
import guessedWordsContext from "../contexts/guessedWordsContext";

/**
 * Factory fuction to create a ShallowWrapper for the GuessedWords component
 * @function setup
 * @param {Array} guessedWords - guessedWords value specific to this setup.
 * @returns {ShallowWrapper}
 */

const setup = (guessedWords = []) => {
  const mockUseGuessedWords = jest
    .fn()
    .mockReturnValue([guessedWords, jest.fn()]);
  guessedWordsContext.useGuessedWords = mockUseGuessedWords;
  return shallow(<GuessedWords />);
};

describe("if there are no words guessed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup([]);
  });
  test("renders without error", () => {
    const component = findByTestAttr(
      wrapper,
      "component-guessed-words"
    );
    expect(component.length).toBe(1);
  });
  test("renders instructions to guess a word", () => {
    const instructions = findByTestAttr(
      wrapper,
      "guessed-instructions"
    );
    expect(instructions.text().length).not.toBe(0);
  });
});

describe("if there are words guessed", () => {
  const guessedWords = [
    { guessedWord: "train", letterMatchCount: 3 },
    { guessedWord: "agile", letterMatchCount: 1 },
    { guessedWord: "party", letterMatchCount: 5 }
  ];

  let wrapper;
  beforeEach(() => {
    wrapper = setup(guessedWords);
  });
  test("renders without error", () => {
    const component = findByTestAttr(
      wrapper,
      "component-guessed-words"
    );
    expect(component.length).toBe(1);
  });
  test("renders 'guessed words' section", () => {
    const guessedWordsNode = findByTestAttr(wrapper, "guessed-words");
    expect(guessedWordsNode.length).toBe(1);
  });
  test("correct number of guessed words", () => {
    const guessedWordsNodes = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordsNodes.length).toBe(guessedWords.length);
  });
});

describe("languagePicker", () => {
  test("correctly renders guess instructions string in English", () => {
    const wrapper = setup([]);
    const guessInstructions = findByTestAttr(
      wrapper,
      "guessed-instructions"
    );
    expect(guessInstructions.text()).toBe(
      "Try to guess the secret word!"
    );
  });

  test("correctly renders guess instructions string in emoji", () => {
    const mockUseContext = jest.fn().mockReturnValue("emoji");
    React.useContext = mockUseContext;
    const wrapper = setup();
    const guessInstructions = findByTestAttr(
      wrapper,
      "guessed-instructions"
    );
    expect(guessInstructions.text()).toBe("🤔🤫🔤");
  });
});
