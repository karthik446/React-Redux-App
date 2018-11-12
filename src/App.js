import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Message from "./components/Message";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Message />
        <Router>
          <div className="Todo-App">
            <TodoForm />
            <Route
              path="/:filter?"
              render={({ match }) => <TodoList filter={match.params.filter} />}
            />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
