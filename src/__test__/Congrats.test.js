import React from "react";
import { shallow } from "enzyme";
import Congrats from "../Congrats";
import { findByTestAttr } from "./testUtils";

/**
 * Factory fuction to create a ShallowWrapper for Congrats component.
 * @function setUp
 * @param {object} props - component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setUp = (props = {}) => {
  return shallow(<Congrats {...props} />);
};

test("renders without error", () => {
  const wrapper = setUp();
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
