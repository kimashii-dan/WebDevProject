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
