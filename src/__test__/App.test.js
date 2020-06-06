import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "test/testUtils";
import App from "../App";

/**
 * Factory function to create shallow wrapper for App component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => {
  return shallow(<App />);
};

test("App renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-app");
  expect(component.length).toBe(1);
});
