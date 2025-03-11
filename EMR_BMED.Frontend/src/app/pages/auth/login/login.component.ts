import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="handleLogin()">
      <label>
        Username
        <input type="text" formControlName="username" />

        @if (errors.username() !== null) {
          <span>{{ errors.username() }}</span>
        }
      </label>
      <br />

      <label>
        Password
        <input type="password" formControlName="password" />

        @if (errors.password() !== null) {
          <span>{{ errors.password() }}</span>
        }
      </label>
      <br />

      <button type="submit">Login</button>
    </form>
  `,
  styles: ``,
})
export class LoginComponent {
  readonly loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  readonly errors = {
    username: signal<string | null>(null),
    password: signal<string | null>(null),
  };

  handleLogin() {
    this.httpService
      .post<{ token: string; error?: string }>(
        'http://localhost:8080/auth/login',
        this.loginForm.value,
        {
          observe: 'response',
        },
      )
      .subscribe({
        next: (response) => {
          this.errors.username.set(null);
          this.errors.password.set(null);
          this.cookieService.set('access_token', response.body!.token);
          this.routerService.navigate(['/']);
        },
        error: (response) => {
          this.errors.username.set(response?.error?.username ?? null);
          this.errors.password.set(response?.error?.password ?? null);
        },
      });
  }

  private httpService = inject(HttpClient);
  private cookieService = inject(CookieService);
  private routerService = inject(Router);
}
