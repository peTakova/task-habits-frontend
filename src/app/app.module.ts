import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskFormComponent } from './components/task-form.component'; // Import
import { TaskListComponent } from './compoments/task-list.component'; // Import

@NgModule({
  declarations: [
    AppComponent,
    TaskFormComponent,
    TaskListComponent,
    HabitListComponent,
],
imports: [
  BrowserModule,
  AppRoutingModule,
  FormsModule,
  HttpClientModule,
],
providers: [],
bootstrap: [AppComponent],
})
export class AppModule {}
