import React from "react";
import { mount, shallow } from "enzyme";

import App from "./App";

describe("App", () => {
  let app = shallow(<App />);
  let initialAppState = { text: "", notes: [], key: "MYNOTES:COOKIE:KEY" };
  let note = "Testing FormControl input";

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
    it("has a state object", () => {
      expect(app.state()).toEqual(initialAppState);
    });

    describe("input is controlled", () => {
      beforeAll(() => {
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

      describe("and saves notes to cookies", () => {
        it("readCookie method returns the note", () => {
          expect(app.instance().readCookie()).toEqual([note]);
        });
      });

      describe("and app renders a list of notes", () => {
        it("contains a list", () => {
          expect(app.find(".notes-list").exists()).toBe(true);
        });

        it("contains the adds a Note in the list", () => {
          expect(app.find("Note").exists()).toBe(true);
        });
      });
    });
  });
});
