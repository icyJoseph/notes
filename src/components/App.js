import React, { Component } from "react";
import { Form, Button, FormControl } from "react-bootstrap";

class App extends Component {
  state = { text: "" };
  render() {
    return (
      <div>
        <h2 className="title">My Notes</h2>
        <Form>
          <FormControl
            onChange={e => this.setState({ text: e.target.value })}
          />
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default App;
