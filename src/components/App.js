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
    this.setState({ notes: read_cookie(this.state.key) });
  }

  saveCookie = cookie => {
    bake_cookie(this.state.key, cookie);
  };

  readCookie = () => {
    return read_cookie(this.state.key);
  };

  submit = () => {
    this.setState(prevState => ({
      text: "",
      notes: [...prevState.notes, prevState.text]
    }));
    this.saveCookie(this.state.notes);
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
          <Button onClick={() => this.submit()}>Submit</Button>
        </Form>
        <ul className="notes-list">
          {notes.map((note, i) => (
            <Note key={i} className="note" note={note} />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
