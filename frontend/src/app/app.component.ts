import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  showNavbar = true;
  isAuthenticated = false;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.isAuthenticated$.subscribe((status) => {
      this.isAuthenticated = status;
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showNavbar = !event.url.startsWith('/auth');
      });
  }
}
