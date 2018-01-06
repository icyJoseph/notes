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

    describe("Form does not act on default", () => {
      const preventDefaultFunction = "e => e.preventDefault()";
      expect(
        app
          .find("Form")
          .get(0)
          .props.onSubmit.toString()
      ).toEqual(preventDefaultFunction);
    });
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

  describe("App state", () => {
    let initialAppState = { text: "", notes: [] };
    let note = "Testing FormControl input";

    it("has a state object", () => {
      expect(app.state()).toEqual(initialAppState);
    });

    describe("input is controlled", () => {
      beforeEach(() => {
        app.find("FormControl").simulate("change", { target: { value: note } });
      });

      it("updates state with input", () => {
        expect(app.state().text).toEqual(note);
      });

      it("shows `state.text` as its value", () => {
        expect(app.find("FormControl").get(0).props.value).toEqual(
          app.state().text
        );
      });

      describe("and the Submit button updates state", () => {
        beforeEach(() => {
          app.find("Button").simulate("click");
        });

        it("adds note to `state.notes`", () => {
          expect(app.state().notes).toEqual([note]);
        });
      });

      describe("and app renders a list of notes", () => {
        it("contains a list", () => {
          expect(app.find(".notes-list").exists()).toBe(true);
        });

        it("contains the added note in the list", () => {
          expect(app.find(".note").exists()).toBe(true);
        });
      });
    });
  });
});
