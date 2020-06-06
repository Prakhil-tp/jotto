import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "test/testUtils";
import Input from "../Input";

const defaultProps = { secretWord: "party" };

/**
 * Factory function to create ShallowWrapper for Input component.
 * @function setup
 * @param {object} props - component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Input {...setupProps} />);
};

test("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-input");
  expect(component.length).toBe(1);
});

test("doesn't throw warnings with expected props", () => {
  const expectedProps = { secretWord: "party" };
  checkProps(Input, expectedProps);
});
