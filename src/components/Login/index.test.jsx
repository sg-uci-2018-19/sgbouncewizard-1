import React from "react";
import { Redirect } from "react-router-dom";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Login from ".";

describe("Login", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Login />);
  });

  it("should render correctly", () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render username input", () => {
    expect(wrapper.find('[data-test="username-field"]')).toHaveLength(1);
  });

  it("should render password input", () => {
    expect(wrapper.find('[data-test="password-field"]')).toHaveLength(1);
  });

  it("should display loading button when user is being authenticated", () => {
    wrapper.setProps({
      username: "ziv",
      password: "papa",
      isAuthenticating: true,
    });
    expect(wrapper.exists('[data-test="login-loading-button"]')).toBeTruthy();
  });

  it("should display error when credentails are invalid", () => {
    wrapper.setProps({
      username: "wrong",
      password: "password",
      isAuthenticating: false,
      isAuthenticationError: true,
      isInvalidCredentials: true,
    });
    expect(
      wrapper.exists('[data-test="invalid-credentials-alert"]')
    ).toBeTruthy();
    expect(wrapper.find(Redirect)).toHaveLength(0);
  });

  it("should display error when there is a network error", () => {
    wrapper.setProps({
      username: "ziv",
      password: "papa",
      isAuthenticating: false,
      isAuthenticationError: true,
      isNetworkError: true,
    });
    expect(wrapper.exists('[data-test="network-error-alert"]')).toBeTruthy();
    expect(wrapper.find(Redirect)).toHaveLength(0);
  });

  it("should display error when there is input is invalid", () => {
    wrapper.setProps({
      username: "",
      password: "",
      isAuthenticating: false,
      isAuthenticationError: true,
      isInvalidInput: true,
    });
    expect(wrapper.exists('[data-test="invalid-input-alert"]')).toBeTruthy();
    expect(wrapper.find(Redirect)).toHaveLength(0);
  });
});
