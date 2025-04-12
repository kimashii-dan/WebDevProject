import { Component, inject } from '@angular/core';
import { ProfileService } from './profile.service';
import { UserData } from '../types';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  profileData: UserData | null = null;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService
  ) {
    this.profileService.fetchProfile().subscribe({
      next: (data) => (this.profileData = data),
      error: (err) => console.error('Profile load failed:', err),
    });
  }

  handleClick() {
    this.authService.logout();
  }
}
