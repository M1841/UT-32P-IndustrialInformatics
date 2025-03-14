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
      <h2>Login Form</h2>
      <a href="auth/register">Don't have an account?</a><br />

      <label>
        Email
        <input type="text" formControlName="email" />

        @if (errors.email() !== null) {
          <span>{{ errors.email() }}</span>
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
    email: new FormControl(''),
    password: new FormControl(''),
  });
  readonly errors = {
    email: signal<string | null>(null),
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
          this.errors.email.set(null);
          this.errors.password.set(null);
          this.cookieService.set('access_token', response.body!.token);
          this.routerService.navigate(['/']);
        },
        error: (response) => {
          this.errors.email.set(response?.error?.email ?? null);
          this.errors.password.set(response?.error?.password ?? null);
        },
      });
  }

  private httpService = inject(HttpClient);
  private cookieService = inject(CookieService);
  private routerService = inject(Router);
}
