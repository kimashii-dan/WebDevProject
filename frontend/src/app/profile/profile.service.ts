import { inject, Injectable } from '@angular/core';
import { UserData } from '../types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  httpClient: HttpClient = inject(HttpClient);

  url = 'http://localhost:8000/api/profile/';

  fetchProfile(): Observable<UserData> {
    return this.httpClient.get<UserData>(this.url);
  }
}
