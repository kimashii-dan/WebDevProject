import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private http: HttpClient, private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();

    if (accessToken) {
      req = this.addTokenHeader(req, accessToken);
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          !req.url.includes('api/token/refresh/')
        ) {
          return this.handle401Error(req, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    const refreshToken = this.authService.getRefreshToken();

    if (refreshToken) {
      return this.http
        .post<{ access: string }>('http://localhost:8000/api/token/refresh/', {
          refresh: refreshToken,
        })
        .pipe(
          switchMap((res) => {
            this.authService.saveAccessToken(res.access);
            return next.handle(this.addTokenHeader(request, res.access));
          }),
          catchError((err) => {
            this.authService.logout();
            return throwError(() => err);
          })
        );
    }

    this.authService.logout();
    return throwError(() => new Error('Authentication failed'));
  }
}
