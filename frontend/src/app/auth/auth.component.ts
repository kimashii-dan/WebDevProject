import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { LoginResponse, RegisterResponse } from '../types';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  isLogin = true;
  formData = {
    username: '',
    password: '',
  };

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.formData = { username: '', password: '' };
  }

  async onSubmit() {
    if (!this.formData.username || !this.formData.password) {
      console.log('Please fill all fields');
      return;
    }

    if (this.isLogin) {
      console.log('Login data:', this.formData);
      this.http
        .post<LoginResponse>('http://localhost:8000/api/token/', this.formData)
        .subscribe({
          next: (data) => {
            this.snackBar.open('Login successful!', 'Close', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
            console.log('Login successful:', data);
            this.authService.saveBothTokens(data.access, data.refresh);
            this.router.navigate(['/']);
          },
          error: (error) => {
            this.snackBar.open(`Login failed: ${error}`, 'Close', {
              duration: 3000,
            });
          },
        });
    } else {
      console.log('Register data:', this.formData);
      this.http
        .post<RegisterResponse>(
          'http://localhost:8000/api/register/',
          this.formData
        )
        .subscribe({
          next: (data) => {
            this.snackBar.open('Registration successful!', 'Close', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
            this.isLogin = true;
          },
          error: (error) => {
            this.snackBar.open(`Registration failed: ${error}`, 'Close', {
              duration: 3000,
            });
          },
        });
    }
  }
}
