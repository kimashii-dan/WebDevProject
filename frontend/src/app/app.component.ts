import { ApplicationModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent {
  showNavbar = true;
  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showNavbar = !['/auth'].includes(event.url);
      });
  }
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
