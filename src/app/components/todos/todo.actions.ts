import { Action } from '@ngrx/store';
import { Todo } from '../../todo.model';
import { TodoFilter } from '../filters/filter.model';
import { Injectable } from '@angular/core';

export const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
export const GET_TODOS_ERROR = "GET_TODOS_SUCCES";
export const ADD_TODO_ERROR = "ADD_TODO_ERROR";



@Injectable()

export class TodoActions {

  static GET_TODOS = "GET_TODOS";
  getTodos(): Action {
    return {
      type: TodoActions.GET_TODOS,
    }
  }

  static ADD_TODO = "ADD_TODO";
  addTodo(title: string): Action {
    return {
      type: TodoActions.ADD_TODO,
      payload: {
        title,
      }
    }
  }

  static ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
  addTodoSuccess(todo: Todo) {
    return {
      type: TodoActions.ADD_TODO_SUCCESS,
      payload: todo
    };
  }

  static TOGGLE_TODO = "TOGGLE_TODO";
  toggledTodo(todo: Todo): Action {
    return {
      type: TodoActions.TOGGLE_TODO,
      payload: todo
    }
  }

  static REMOVE_TODO = "REMOVE_TODO";
  removeTodo(todo: Todo): Action {
    return {
      type: TodoActions.REMOVE_TODO,
      payload: todo
    }
  }

  static SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";
  setVisibilityFilter(filter: TodoFilter): Action {
    console.log(filter, "FILTER");
    return {
      type: TodoActions.SET_VISIBILITY_FILTER,
      payload: filter
    }
  }
}
