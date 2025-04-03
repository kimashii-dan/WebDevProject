import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AuthComponent],
  template: '<app-auth />'
})
export class AppComponent {
  title = 'frontend';
}


// // @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })