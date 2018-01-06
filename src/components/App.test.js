import React from "react";
import { shallow } from "enzyme";

import App from "./App";

describe("App", () => {
  const app = shallow(<App />);
  it("renders correctly", () => {
    expect(app).toMatchSnapshot();
  });

  it("renders `My Notes` title", () => {
    expect(app.find(".title").exists()).toBe(true);
    expect(app.find(".title").text()).toEqual("My Notes");
  });

  it("renders a bootstrap Form", () => {
    expect(app.find("Form").exists()).toBe(true);
  });

  it("renders a bootstrap FormControl", () => {
    expect(app.find("FormControl").exists()).toBe(true);
  });

  it("renders a bootstrap Button with `Submit` text", () => {
    expect(app.find("Button").exists()).toBe(true);
    expect(
      app
        .find("Button")
        .render()
        .text()
    ).toEqual("Submit");
  });
});
