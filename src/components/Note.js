import React from "react";

const Note = ({ note }) => {
  return <li className="note">{note}</li>;
};

Note.displayName = "Note";

export default Note;
