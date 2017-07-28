import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Observable } from "rxjs";
import { TodosServiceComponent } from './todos.service';
import { ADD_TODO_ERROR,  GET_TODOS_ERROR, GET_TODOS_SUCCESS, TodoActions } from './todo.actions';
import { Store } from '@ngrx/store';
import { getFilterState } from "../../reducers/index";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';


@Injectable()
export class TodosEffects {
  constructor(private actions$ : Actions, private todosService : TodosServiceComponent, private store: Store<{}>) {
  }

  @Effect() getTodos$ = this.actions$
    .ofType(TodoActions.GET_TODOS)
    .withLatestFrom(this.store.select(getFilterState), ( action, filter ) => filter)
    .switchMap(filter =>
      this.todosService.getTodos( filter )
        .map(todos => ({type: GET_TODOS_SUCCESS, payload: todos}))
        .catch(() => Observable.of({type: GET_TODOS_ERROR})));

  @Effect() addTodo$ = this.actions$
    .ofType(TodoActions.ADD_TODO)
    .switchMap(action =>
      this.todosService.addTodo(action.payload.title)
        .map(todo => ({type: TodoActions.ADD_TODO_SUCCESS, payload: todo}))
        .catch(() => Observable.of({type: ADD_TODO_ERROR})));

}
