import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from "../../todo.model";

@Component ({
  selector: 'todo',
  template: `
    <p>
      <input type="checkbox" [id]="todo.id" name="check" [checked]="todo.completed" (change)="toggled.emit(todo)">
      <label [for]="todo.id"><span>{{ todo.title }}</span> 
        <button *ngIf="todo.completed" class="remove" (click)="removeTodo.emit(todo)" style="color:white">
          x
        </button>
      </label>
    </p>
  `,
  styleUrls: ['../todos/todo.style.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodoComponent implements OnInit{
  @Input() todo: Todo;
  @Output() toggled = new EventEmitter<Todo>();
  @Output() removeTodo = new EventEmitter<Todo>();

  constructor() {  }

  ngOnInit() {  }
}
