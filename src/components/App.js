import React, { Component } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import Note from "./Note";
import { bake_cookie, read_cookie } from "sfcookies";

class App extends Component {
  state = {
    text: "",
    notes: [],
    key: "MYNOTES:COOKIE:KEY"
  };

  componentDidMount() {
    this.setState({ notes: this.readCookie(this.state.key) });
  }

  componentDidUpdate() {
    this.saveCookie();
  }
  saveCookie = () => {
    bake_cookie(this.state.key, this.state.notes);
  };

  readCookie = () => {
    return read_cookie(this.state.key);
  };

  submit = () => {
    this.setState(prevState => ({
      text: "",
      notes: [...prevState.notes, prevState.text]
    }));
  };

  render() {
    const { notes } = this.state;
    return (
      <div>
        <h2 className="title">My Notes</h2>
        <Form onSubmit={e => e.preventDefault()}>
          <FormControl
            value={this.state.text}
            onChange={e => this.setState({ text: e.target.value })}
          />
          <Button className="submit-button" onClick={() => this.submit()}>
            Submit
          </Button>
        </Form>
        <ul className="notes-list">
          {notes.map((note, i) => (
            <Note key={i} className="note" note={note} />
          ))}
        </ul>
        <Button className="clear-notes">Clear Notes</Button>
      </div>
    );
  }
}

export default App;
