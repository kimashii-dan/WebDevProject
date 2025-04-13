import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TaskListComponent } from '././components/task-list/task-list.component';
import { TaskFormComponent } from '././components/task-form/task-form.component';
import { AuthComponent } from './auth/auth.component';



export const routes: Routes = [
  { path: 'tasks', component: TaskListComponent },
  { path: 'new-task', component: TaskFormComponent },
  { path: 'login', component: AuthComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// import { Routes } from '@angular/router';
// import { AuthComponent } from './auth/auth.component';
// import { TaskListComponent } from './components/task-list/task-list.component';
// import { TaskFormComponent } from './components/task-form/task-form.component';
// import { NavbarComponent } from './components/navbar/navbar.component';

// export const routes: Routes = [
//   {
//     path: '',
//     component: NavbarComponent,
//     children: [
//       { path: '', redirectTo: 'tasks', pathMatch: 'full' },
//       { path: 'tasks', component: TaskListComponent },
//       { path: 'tasks/new', component: TaskFormComponent },
//     ],
//   },
//   { path: 'login', component: AuthComponent },
// ];
