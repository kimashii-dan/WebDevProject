import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  {
    component: AuthComponent,
    path: 'auth',
    title: 'Auth',
  },
  {
    component: ProfileComponent,
    path: 'profile',
    title: 'Profile',
  },
];
