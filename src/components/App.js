import React, { Component } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import Note from "./Note";

class App extends Component {
  state = {
    text: "",
    notes: []
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
