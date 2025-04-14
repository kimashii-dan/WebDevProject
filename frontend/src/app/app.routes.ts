import { TaskListComponent } from '././components/task-list/task-list.component';
import { TaskFormComponent } from '././components/task-form/task-form.component';
import { AuthComponent } from './auth/auth.component';
import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { UnauthenticatedGuard } from './guards/unauthenticated.guard';

export const routes: Routes = [
  {
    path: '',
    component: TaskListComponent,
    canActivate: [UnauthenticatedGuard],
  },
  { path: 'auth', component: AuthComponent, canActivate: [AuthenticatedGuard] },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [UnauthenticatedGuard],
  },
];
