import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    @if (user() !== null) {
      <p>Logged in as: {{ user()!.name }} {{ user()!.surname }}</p>
    } @else {
      <a href="auth/login">Login</a> <br />
      <a href="auth/register">Register (Patient)</a> <br />
      <a href="auth/register/doctor">Register (Doctor)</a>
    }
  `,
  styles: ``,
})
export class HomeComponent {
  readonly user = signal<{ name: string; surname: string } | null>(null);
  readonly name = computed(() => {
    if (this.user() !== null) {
      return `${this.user()!.name} ${this.user()!.surname}`;
    }
    return '';
  });

  ngOnInit() {
    const token = this.cookieService.get('access_token');
    if (!!token) {
      this.httpService
        .get<{ name: string; surname: string }>(
          'http://localhost:8080/auth/whoami',
          {
            headers: new HttpHeaders({
              Authorization: `Bearer ${token}`,
            }),
            observe: 'response',
          },
        )
        .subscribe({
          next: (response) => {
            this.user.set(response.body ?? null);
          },
        });
    }
  }

  private httpService = inject(HttpClient);
  private cookieService = inject(CookieService);
}
