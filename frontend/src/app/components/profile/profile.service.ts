import { inject, Injectable } from '@angular/core';
import { UserData } from '../../types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private url = 'http://localhost:8000/api/profile/';

  constructor(private httpClient: HttpClient) {}

  fetchProfile(): Observable<UserData> {
    return this.httpClient.get<UserData>(this.url);
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { User } from '../models/user.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProfileService {
//   private apiUrl = 'http://localhost:8000/api/profile';  // Django API URL

//   constructor(private http: HttpClient) {}

//   getProfile(): Observable<User> {
//     return this.http.get<User>(`${this.apiUrl}/`);
//   }

//   updateProfile(user: User): Observable<User> {
//     return this.http.patch<User>(`${this.apiUrl}/update/`, user);
//   }

//   uploadAvatar(file: File): Observable<{ avatarUrl: string }> {
//     const formData = new FormData();
//     formData.append('avatar', file);
//     return this.http.post<{ avatarUrl: string }>(`${this.apiUrl}/upload_avatar/`, formData);
//   }
// }