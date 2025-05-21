import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TaskFormComponent } from './components/task-form.component';
import { TaskListComponent } from './components/task-list.component';
import { HabitListComponent } from './components/habit-list.component';
import { HabitFormComponent } from './components/habit-form.component';
import { HomeComponent } from './components/home.component';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskFormComponent,
    TaskListComponent,
    HabitListComponent,
    HabitFormComponent,
    HomeComponent

],
imports: [
  BrowserModule,
  CommonModule,
  AppRoutingModule,
  FormsModule,
  HttpClientModule,
  LoginComponent,
  RegisterComponent
],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
