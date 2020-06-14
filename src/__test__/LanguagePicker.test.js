import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "test/testUtils";
import LanguagePicker from "../LanguagePicker";

const mockSetLanguage = jest.fn();

const setup = () => {
  return shallow(<LanguagePicker setLanguage={mockSetLanguage} />);
};

test("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(
    wrapper,
    "component-language-picker"
  );
  expect(component.exists()).toBe(true);
});

test("doesn't throw warnings with expected props", () => {
  const expectedProps = { setLanguage: jest.fn() };
  checkProps(LanguagePicker, expectedProps);
});

test("renders non-zero language icons", () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, "language-icon");
  expect(languageIcons.length).toBeGreaterThan(0);
});

test("calls set language prop upon click", () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, "language-icon");
  const firstIcon = languageIcons.first();
  firstIcon.simulate("click");

  expect(mockSetLanguage).toHaveBeenCalled();
});
