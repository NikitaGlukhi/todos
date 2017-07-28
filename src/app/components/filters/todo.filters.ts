import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoFilter } from './filter.model';


@Component({
  selector: 'todo-filters',
  template: `<select [formControl]="filter" (change)="changeFilter.next(filter.value)">
                <option *ngFor="let filter of filters" [ngValue]="filter.id">
                   {{ filter.title }}
                </option>
             </select>`
})

export class FiltersComponent {
  @Input() filters;
  @Output() changeFilter = new EventEmitter<{}>();
  filter: FormControl;

  constructor() {
    this.filter = new FormControl();
  }

  @Input() set active( val: TodoFilter ) {
    this.filter.setValue(val);
  }

}
