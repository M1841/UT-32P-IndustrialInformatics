import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    @if (username() !== null) {
      <p>Welcome {{ username() }}!</p>
    } @else {
      <a href="auth/login">Login</a> <br />
      <a href="auth/register">Register (Patient)</a> <br />
      <a href="auth/register/doctor">Register (Doctor)</a>
    }
  `,
  styles: ``,
})
export class HomeComponent {
  readonly username = signal<string | null>(null);

  ngOnInit() {
    const token = this.cookieService.get('access_token');
    if (token) {
      this.httpService
        .get<{ username: string }>('http://localhost:8080/auth/whoami', {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
          }),
          observe: 'response',
        })
        .subscribe({
          next: (response) => {
            this.username.set(response.body?.username ?? null);
          },
        });
    }
  }

  private httpService = inject(HttpClient);
  private cookieService = inject(CookieService);
}
