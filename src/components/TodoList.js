import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchTodos,
  toggleTodo,
  destroyTodo,
  getVisibleTodos
} from "../reducers/todo";

const TodoItem = ({ id, name, isComplete, toggleTodo, destroyTodo }) => (
  <li>
    <span className="delete-item">
      <button onClick={() => destroyTodo(id)}>X</button>
    </span>
    <input
      type="checkbox"
      defaultChecked={isComplete}
      onChange={() => toggleTodo(id)}
    />
    {name}
  </li>
);
class TodoList extends Component {
  componentDidMount() {
    this.props.fetchTodos();
  }
  render() {
    return (
      <div className="Todo-List">
        <ul>
          {this.props.todos.map(todo => (
            <TodoItem
              key={todo.id}
              toggleTodo={this.props.toggleTodo}
              destroyTodo={this.props.destroyTodo}
              {...todo}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    todos: getVisibleTodos(state.todo.todos, ownProps.filter)
  }),
  { fetchTodos, toggleTodo, destroyTodo }
)(TodoList);
