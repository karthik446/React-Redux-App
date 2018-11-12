import { createAction } from "redux-actions";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
} from "../lib/todoServices";
import { showMessage } from "./messages";
const initState = {
  todos: [],
  currentTodo: ""
};

const CURRENT_UPDATE = "CURRENT_UPDATE";
export const TODO_REPLACE = "TODO_REPLACE";
export const TODO_REMOVE = "TODO_REMOVE";
export const TODO_ADD = "TODO_ADD";
export const TODOS_LOAD = "TODOS_LOAD";
const SHOW_LOADER = "SHOW_LOADER";
const HIDE_LOADER = "HIDE_LOADER";
/**
 * Action creator Methods
 */
// export const updateCurrent = val => ({ type: CURRENT_UPDATE, payload: val });
// Flux standard Action- Action must have a type and may have a payload property, can also have an error key - a boolean value
// indicating if payload is error, meta key -> not part of payload
export const updateCurrent = createAction(CURRENT_UPDATE);
export const loadTodos = createAction(TODOS_LOAD);
export const addTodo = createAction(TODO_ADD);
export const replaceTodo = createAction(TODO_REPLACE);
export const removeTodo = createAction(TODO_REMOVE);
export const showLoader = createAction(SHOW_LOADER, () => true);
export const hideLoader = createAction(HIDE_LOADER, () => true);

/**
 * Redux Thunk Methods
 */
export const fetchTodos = () => {
  return dispatch => {
    dispatch(showLoader());
    getTodos().then(todos => dispatch(loadTodos(todos)));
  };
};

export const saveTodo = name => {
  return dispatch => {
    dispatch(showMessage("Saving Todo"));
    dispatch(showLoader());

    createTodo(name).then(todo => dispatch(addTodo(todo)));
  };
};

export const toggleTodo = id => {
  return (dispatch, getState) => {
    dispatch(showMessage("Saving Todo Update"));
    const { todos } = getState().todo;
    const todo = todos.find(t => t.id === id);
    const toggled = { ...todo, isComplete: !todo.isComplete };
    updateTodo(toggled).then(res => dispatch(replaceTodo(res)));
  };
};
export const destroyTodo = id => {
  return dispatch => {
    dispatch(showMessage("Deleting Todo"));
    deleteTodo(id).then(() => dispatch(removeTodo(id)));
  };
};

export const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "active":
      return todos.filter(p => !p.isComplete);
    case "completed":
      return todos.filter(p => p.isComplete);
    default:
      return todos;
  }
};

export default (state = initState, action) => {
  switch (action.type) {
    case TODO_ADD:
      return {
        ...state,
        currentTodo: "",
        todos: state.todos.concat(action.payload)
      };
    case CURRENT_UPDATE:
      return { ...state, currentTodo: action.payload };
    case TODOS_LOAD:
      return { ...state, todos: action.payload };
    case TODO_REMOVE:
      return {
        ...state,
        todos: state.todos.filter(p => p.id !== action.payload)
      };
    case TODO_REPLACE:
      return {
        ...state,
        todos: state.todos.map(
          p => (p.id === action.payload.id ? action.payload : p)
        )
      };
    case SHOW_LOADER:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
