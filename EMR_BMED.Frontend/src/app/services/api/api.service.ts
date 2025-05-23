import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly isAuthenticated = computed(() => !!this.cookies.get('access_token'));

  login(
    credentials: Partial<{ email: string | null; password: string | null }>,
  ) {
    return this.post<
      {
        token: string;
        error?: {
          email?: string;
          password?: string;
        };
      },
      any
    >('auth/login', credentials).pipe(
      tap((response) => {
        if (response.ok) {
          this.cookies.set('access_token', response.body!.token, {
            secure: true,
            sameSite: 'Strict',
            path: '/',
          });
        }
      }),
    );
  }

  logout() {
    this.cookies.deleteAll();
    this.router.navigate(['auth/login']);
    window.location.href = '/auth/login';
  }

  get<Res>(endpoint: string, params: string = '') {
    return this.http.get<Res>(
      `${this.url}/${endpoint}${params}`,
      this.options(),
    );
  }
  post<Res, Req>(endpoint: string, body: Req) {
    return this.http.post<Res>(`${this.url}/${endpoint}`, body, this.options());
  }
  put<Res, Req>(endpoint: string, body: Req) {
    return this.http.put<Res>(`${this.url}/${endpoint}`, body, this.options());
  }
  delete<Res>(endpoint: string) {
    return this.http.delete<Res>(`${this.url}/${endpoint}`, this.options());
  }

  private readonly url = 'http://localhost:8080';
  private options() {
    return {
      headers: {
        Authorization: `Bearer ${this.cookies.get('access_token')}`,
      },
      observe: 'response' as const,
    };
  }

  private readonly cookies = inject(CookieService);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
}
