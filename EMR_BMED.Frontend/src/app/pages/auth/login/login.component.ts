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
      </label>

      <label>
        Password
        <input type="password" formControlName="password" />
      </label>

      <button type="submit">Login</button>
    </form>

    @if(error() != null) {
      <p>{{ error() }}</p>
    }
  `,
  styles: ``,
})
export class LoginComponent {
  readonly loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  readonly error = signal<string | null>(null);

  handleLogin() {
    this.http
      .post<{ token: string; error?: string }>(
        'http://localhost:8080/auth/login',
        this.loginForm.value,
        {
          observe: 'response',
        }
      )
      .subscribe({
        next: (response) => {
          this.error.set(null);
          this.cookies.set('access_token', response.body!.token);
          this.router.navigate(['/']);
        },
        error: (response) => {
          this.error.set(response?.error?.message ?? 'Unknown error');
          console.error(response);
        },
      });
  }

  private http = inject(HttpClient);
  private router = inject(Router);
  private cookies = inject(CookieService);
}
