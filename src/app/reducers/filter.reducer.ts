import { Action } from '@ngrx/store';
import { TodoActions } from '../components/actions/todo.actions';
import { TodoFilter } from '../components/filters/filter.model';

export default function visibilityFilter( state: TodoFilter = "SHOW_ALL", action: Action ):TodoFilter {
  switch( action.type ) {
    case TodoActions.SET_VISIBILITY_FILTER:
      console.log(action.payload, "PAYLOAD");
      return action.payload;
    default:
      return state;
  }
};
