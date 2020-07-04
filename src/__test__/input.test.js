import React from "react";
import { mount } from "enzyme";
import { findByTestAttr, checkProps } from "test/testUtils";
import languageContext from "../contexts/languageContext";
import Input from "../Input";
import successContext from "../contexts/successContext";
import guessedWordsContext from "src/contexts/guessedWordsContext";

/**
 * Factory function to create ShallowWrapper for Input component.
 * @function setup
 * @param {object} testValues - context and props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = ({ secretWord, language, success }) => {
  // const setupProps = { ...defaultProps, ...props };
  // return shallow(<Input {...setupProps} />);
  secretWord = secretWord || "party";
  language = language || "en";
  success = success || false;

  return mount(
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <guessedWordsContext.GuessedWordsProvider>
          <Input secretWord={secretWord} />
        </guessedWordsContext.GuessedWordsProvider>
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
};

test("renders without error", () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, "component-input");
  expect(component.length).toBe(1);
});

test("doesn't throw warnings with expected props", () => {
  const expectedProps = { secretWord: "party" };
  checkProps(Input, expectedProps);
});

describe("state controlled input field", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup({});
  });

  test("state updates with the value of input box upon change", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");

    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });

  test("clear state when button clicks", () => {
    const submitButton = findByTestAttr(wrapper, "submit-button");

    submitButton.simulate("click", { preventDefault() {} });

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});

describe("languagePicker", () => {
  test("correctly renders submit string in english", () => {
    const wrapper = setup({ language: "en" });
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("Submit");
  });

  test("correctly renders congrats string in emoji", () => {
    const wrapper = setup({ language: "emoji" });
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("🚀");
  });
});

test("input component does not show when success is true", () => {
  const wrapper = setup({ secretWord: "party", success: true });
  expect(wrapper.isEmptyRender()).toBe(true);
});
