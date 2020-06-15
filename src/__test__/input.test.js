import React from "react";
import { shallow, mount } from "enzyme";
import { findByTestAttr, checkProps } from "test/testUtils";
import languageContext from "../contexts/languageContext";
import Input from "../Input";

/**
 * Factory function to create ShallowWrapper for Input component.
 * @function setup
 * @param {object} testValues - context and props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = ({ secretWord, language }) => {
  // const setupProps = { ...defaultProps, ...props };
  // return shallow(<Input {...setupProps} />);
  secretWord = secretWord || "party";
  language = language || "en";

  return mount(
    <languageContext.Provider value={language}>
      <Input secretWord={secretWord} />
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
