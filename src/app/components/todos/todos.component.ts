import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import * as fromTodos from '../../reducers/todos.reducer';
import { Todo } from '../../todo.model';

@Component ({
  selector: 'app-todos',
  template: `
    <p *ngIf="todos.pending">Loading...</p>

    <todo *ngFor="let todo of todos.data"
          [todo]="todo"
          (toggled) = "toggled.emit($event)"
          (removeTodo) = "removeTodo.emit($event)">
    </todo>
    
    
    <p *ngIf="todos.error">{{todos.error}}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TodosComponent implements OnInit{
  @Input() todos: fromTodos.TodoState;
  @Output() toggled = new EventEmitter<Todo>();
  @Output() removeTodo = new EventEmitter<Todo>();

  constructor()  {  }

  ngOnInit() {  }
}

