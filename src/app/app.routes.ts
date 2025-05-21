import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list.component';
import { HabitListComponent } from './components/habit-list.component';
import { HomeComponent } from './components/home.component';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';
import { AuthGuard } from './components/auth/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'habits', component: HabitListComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];


