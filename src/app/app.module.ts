import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './components/homepage/homepage.component';
import { AppRoutingModule } from './components/app.routing/routing';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TodosServiceComponent } from './components/todos/todos.service';
import { TodoComponent } from './components/todo/todo.component';
import { TodosComponent } from './components/todos/todos.component';
import { TodosEffects } from './components/todos/todos.effects';
import { EffectsModule } from '@ngrx/effects';
import { AddTodoComponent } from './components/add.todo/add-todo.component';
import { FiltersComponent } from './components/filters/todo.filters';
import { default as reducer } from './reducers';
import { TodoActions } from './components/todos/todo.actions';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TodoComponent,
    TodosComponent,
    AddTodoComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    EffectsModule.run(TodosEffects),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })

  ],
  providers: [ TodosServiceComponent, TodoActions ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
