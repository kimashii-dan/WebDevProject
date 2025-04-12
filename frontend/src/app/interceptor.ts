import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth/auth.service';

export const interceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const http = inject(HttpClient);
  const accessToken = authService.getAccessToken();

  if (accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !req.url.includes('api/token/refresh/')
      ) {
        const refreshToken = authService.getRefreshToken();

        if (refreshToken) {
          return http
            .post<{ access: string }>(
              'http://localhost:8000/api/token/refresh/',
              { refresh: refreshToken }
            )
            .pipe(
              switchMap((res) => {
                authService.saveAccessToken(res.access);
                const clonedReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${res.access}`,
                  },
                });
                return next(clonedReq);
              }),
              catchError((err) => {
                authService.logout();
                return throwError(() => err);
              })
            );
        }

        authService.logout();
        return throwError(() => new Error('Authentication failed'));
      }

      return throwError(() => error);
    })
  );
};
