import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { LoginResponse, RegisterResponse } from '../types';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class AuthComponent {
  constructor(private http: HttpClient, private authService: AuthService, private router: Router ) {}
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
            console.log('Login successful:', data);
            this.authService.saveBothTokens(data.access, data.refresh);
          },
          error: (error) => {
            console.error('Login error:', error);
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
            console.log('Registration successful:', data);
          },
          error: (error) => {
            console.error('Registration error:', error);
          },
        });
    }
  }
  goBack() {
    this.router.navigate(['/tasks']);
  }
  
}
