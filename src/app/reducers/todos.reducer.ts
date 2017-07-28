import { Action } from "@ngrx/store";
import {
  ADD_TODO_ERROR,
  GET_TODOS_ERROR, GET_TODOS_SUCCESS,
      TodoActions } from '../components/todos/todo.actions';
import { Todo } from "../todo.model";

export type TodoItem = Todo[];

export interface TodoState {
  data: TodoItem,
  pending: boolean,
  error: string,
}

const initialState: TodoState = {
  data: [],
  pending: false,
  error: null,
};

export default function todosReducer( state: TodoState = initialState,  action:Action,): TodoState {
  switch( action.type ) {
    case TodoActions.GET_TODOS:
      return Object.assign({}, state, {pending: true, error: null});
    case GET_TODOS_SUCCESS:
      return Object.assign({}, state, {data: action.payload, pending: false});
    case GET_TODOS_ERROR:
      return Object.assign({}, state, {pending: false, error: "Error"});
    case TodoActions.ADD_TODO_SUCCESS:
      return Object.assign({}, state, {data: [...state.data, action.payload]});
    case ADD_TODO_ERROR:
      return Object.assign({}, state, {pending: false, error: "Error"});
     case TodoActions.REMOVE_TODO:
       const todosArr = state.data.filter(todo => todo.id !== action.payload.id);
       return Object.assign({}, state,{data: todosArr });
    case TodoActions.TOGGLE_TODO:
      const newData = state.data.map(todo => {
        if(todo.id !== action.payload.id){
          return todo;
        }
        return Object.assign({}, todo, {
          completed: !todo.completed
        });
      });
      return Object.assign({}, state, { data: newData});

    default:
      return state;
  }
}
