import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TodoState } from '../../reducers/todos.reducer';
import { Store } from '@ngrx/store';
import { TodosEffects } from '../todos/todos.effects';
import { TodoActions } from '../todos/todo.actions';
import { Action } from '@ngrx/store';
import { FilterRecord, TodoFilter } from '../filters/filter.model';
import { AppState, getFilterState, getTodosState } from '../../reducers/index';
import { TodosServiceComponent } from '../todos/todos.service';
import { Todo } from '../../todo.model';

@Component ({
  selector: 'home',
  template:`
    <div style="text-align:center">
      <h1>
        Welcome to my first {{title}} project!!
      </h1>
      <img width="300" src="https://avatars2.githubusercontent.com/u/16272733?v=3&s=500" />
    </div>
    <div style="text-align: right">
      <ul>
        <li>
      <a target="_blank" href="https://github.com/ngrx">NgRX on GitHub</a>
        </li>
      </ul>
    </div>
    <div class="header-bar">
    <nav>
      <app-todos [todos]="todos$ | async" 
                 (toggled)="toggledTodo($event)" 
                 (removeTodo)="removeTodo($event)">
        
      </app-todos>
      
      <app-add-todo (add)="addTodo($event)" 
                    [reset]="addTodoSuccess$ | async">
        
      </app-add-todo>

      <todo-filters [filters]="filters" 
                    [active]="activeFilter$ | async" 
                    (changeFilter)="changeFilter($event)">
        
      </todo-filters>
    </nav>
    </div>
  `,
  styleUrls: ['./homepage.styles.css'],
})

export class HomePageComponent {
  title = "NgRX";
  todos$: Observable<TodoState>;
  activeFilter$: Observable<TodoFilter>;
  addTodoSuccess$ : Observable<Action>;
  filters: FilterRecord[] = [{id: "SHOW_ALL", title: "ALL"}, {id: "SHOW_COMPLETED", title: "COMPLETED"}, {id: "SHOW_ACTIVE", title: "ACTIVE"}];
  private id: number = 0;


  constructor(private todoActions: TodoActions,
              private store : Store<AppState>,
              private todosEffects : TodosEffects,
              private todoService: TodosServiceComponent ) {
    this.store.dispatch(this.todoActions.getTodos());
    this.activeFilter$ = store.select(getFilterState);
    this.addTodoSuccess$ = this.todosEffects.addTodo$.filter(( { type } ) => type === TodoActions.ADD_TODO_SUCCESS);
    this.todos$ = Observable.combineLatest(this.store.select(getTodosState), this.activeFilter$,
      (todos: TodoState, filter: TodoFilter): TodoState => {
      return {
        pending: todos.pending,
        error: todos.error,
        data: this.todoService.getVisibleTodos(todos.data, filter)
         }
      }
    );
  }

  changeFilter( filter ) {
    this.store.dispatch(this.todoActions.setVisibilityFilter(filter));
  }

  removeTodo( todo: Todo ) {
    this.store.dispatch({type: TodoActions.REMOVE_TODO, payload: todo})
  }

  addTodo( title: string ){
    this.store.dispatch(this.todoActions.addTodo(title));
  }

  toggledTodo( todo: Todo ) {
    this.store.dispatch(this.todoActions.toggledTodo(todo));
  }
}
