import React from "react";
import { mount } from "enzyme";

import App from "./App";

describe("Mounted App", () => {
  let app = mount(<App />);

  it("renders My notes title", () => {
    expect(app.find("h2").text()).toEqual("My Notes");
  });

  it("renders the clear button", () => {
    expect(
      app
        .find("Button")
        .at(1)
        .text()
    ).toEqual("Clear Notes");

    describe("when rendering form", () => {
      it("renders Form component", () => {
        expect(app.find("Form").exists()).toBe(true);
      });

      it("renders FormControl component", () => {
        expect(app.find("FormControl").exists()).toBe(true);
      });

      it("renders Submit button", () => {
        expect(
          app
            .find("Button")
            .at(1)
            .text()
        ).toEqual("Submit");
      });
    });
  });
});
