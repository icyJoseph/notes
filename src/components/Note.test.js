import React from "react";
import { shallow } from "enzyme";

import Note from "./Note";

describe("Note", () => {
  const props = { note: "Use me to test" };
  const note = shallow(<Note {...props} />);

  it("renders properly", () => {
    expect(note).toMatchSnapshot();
  });

  it("displays the received props", () => {
    expect(note.find(".note").text()).toEqual(props.note);
  });
});
