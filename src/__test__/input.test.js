import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "test/testUtils";
import Input from "../Input";

/**
 * Factory function to create ShallowWrapper for Input component.
 * @function setup
 * @param {object} props - component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  return shallow(<Input {...props} />);
};

test("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-input");
  expect(component.length).toBe(1);
});
