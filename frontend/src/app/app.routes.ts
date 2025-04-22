import { TaskListComponent } from '././components/task-list/task-list.component';
import { AuthComponent } from './auth/auth.component';
import { Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { UnauthenticatedGuard } from './guards/unauthenticated.guard';
import { TaskDetailsComponent } from './components/task-details/task-details.component';

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
  {
    path: ':id',
    component: TaskDetailsComponent,
    canActivate: [UnauthenticatedGuard],
  },
];
