import todosReducer, * as fromTodos from './todos.reducer';
import { combineReducers } from '@ngrx/store';
import { TodoFilter } from "../components/filters/filter.model";
import { compose } from '@ngrx/core/compose';
import  visibilityFilter  from "./filter.reducer";


export interface AppState {
  todos: fromTodos.TodoState,
  filter: TodoFilter
}

export default compose(combineReducers)({
  todos: todosReducer,
  filter: visibilityFilter
});

export const getTodosState = (state: AppState) => state.todos;
export const getFilterState = (state: AppState) => state.filter;
