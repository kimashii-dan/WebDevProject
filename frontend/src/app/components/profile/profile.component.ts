import { Component, inject } from '@angular/core';
import { ProfileService } from './profile.service';
import { UserData } from '../../types';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-profile',
  imports: [MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  profileData: UserData | null = null;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.profileService.fetchProfile().subscribe({
      next: (data) => (this.profileData = data),
      error: (err) => console.error('Profile load failed:', err),
    });
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
