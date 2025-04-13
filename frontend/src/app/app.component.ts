import { ApplicationModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'frontend';
}


// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [AuthComponent, ApplicationModule],
//   template: '<app-auth />',
// })


// // @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
