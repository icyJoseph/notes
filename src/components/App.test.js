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
    expect(app.find(".submit-button").exists()).toBe(true);
    expect(
      app
        .find(".submit-button")
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
          app.find(".submit-button").simulate("click");
        });

        it("adds note to `state.notes`", () => {
          expect(app.state().notes).toEqual([note]);
        });
      });

      describe("and component updates", () => {
        beforeEach(() => {
          app.instance().componentDidUpdate();
        });
        it("After update, the cookie is saved and can be read", () => {
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

  describe("After componentDidMount, App fetches cookies", () => {
    let app2 = mount(<App />);

    beforeEach(() => {
      app2.instance().componentDidMount();
    });
    it("reads cookies upon mounting", () => {
      expect(app2.state().notes).toEqual([note]);
    });
  });

  it("renders a boostrap button with class `.clear-notes` and Clear Notes text", () => {
    expect(app.find(".clear-notes").exists()).toBe(true);
    expect(
      app
        .find(".clear-notes")
        .render()
        .text()
    ).toEqual("Clear Notes");
  });

  describe("when clicking Clear Notes", () => {
    beforeAll(() => {
      app.find(".clear-notes").simulate("click");
    });
    const noCookies = app.instance().readCookie();
    it("Deletes cookies", () => {
      expect(noCookies).toEqual([]);
    });
    it("Removes all notes from view", () => {
      expect(app.state().notes).toEqual([]);
    });
  });
});
