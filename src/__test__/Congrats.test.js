import React from "react";
import { shallow, mount } from "enzyme";
import Congrats from "../Congrats";
import languageContext from "../contexts/languageContext";
import { findByTestAttr, checkProps } from "test/testUtils";

const defaultProps = { success: false };
/**
 * Factory fuction to create a ShallowWrapper for Congrats component.
 * @function setUp
 * @param {object} testValues - context values specific to this setup.
 * @returns {ShallowWrapper}
 */
const setUp = ({ success, language }) => {
  language = language || "en";
  success = success || false;
  return mount(
    <languageContext.Provider value={language}>
      <Congrats success={success} />
    </languageContext.Provider>
  );
};

describe("languagePicker", () => {
  test("correctly renders congrats string in English", () => {
    const wrapper = setUp({ success: true });
    expect(wrapper.text()).toBe(
      "Congratulations! You guessed the word!"
    );
  });

  test("correctly renders congrats string in emoji", () => {
    const wrapper = setUp({ success: true, language: "emoji" });
    expect(wrapper.text()).toBe("🎯🎉");
  });
});

test("renders without error", () => {
  const wrapper = setUp({});
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.length).toBe(1);
});

test("renders no text when `success` props is false", () => {
  const wrapper = setUp({ success: false });
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.text()).toBe("");
});

test("renders non-empty congrats message when `success` prop is true", () => {
  const wrapper = setUp({ success: true });
  const message = findByTestAttr(wrapper, "congrats-message");
  expect(message.text().length).not.toBe(0);
});

test("does not throw warnings with expected props", () => {
  const expectedProps = { success: false };
  checkProps(Congrats, expectedProps);
});
