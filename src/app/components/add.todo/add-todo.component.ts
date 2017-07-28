import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  template: `<div><input type="text" placeholder="Add todo.." [formControl]="control"></div>
             <button (click)="add.next(control.value)">Add</button>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddTodoComponent implements OnInit{
  control : FormControl = new FormControl('');
  @Output() add = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  @Input()
  public set reset( action ) {
    action && this.control.reset();
  }

}
