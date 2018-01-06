import React, { Component } from "react";
import { Form, Button, FormControl } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <div>
        <h2 className="title">My Notes</h2>
        <Form>
          <FormControl />
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default App;
