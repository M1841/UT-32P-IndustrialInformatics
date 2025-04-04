import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '@/services/api/api.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="handleSubmit()">
      <h2>Login Form</h2>
      <a href="auth/register">Don't have an account?</a><br />

      <label>
        Email
        <input required type="text" formControlName="email" />

        @if (errors.email() !== '') {
          <span>{{ errors.email() }}</span>
        }
      </label>
      <br />

      <label>
        Password
        <input required type="password" formControlName="password" />

        @if (errors.password() !== '') {
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
  readonly form = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });
  readonly errors = {
    email: signal<string>(''),
    password: signal<string>(''),
  };

  handleSubmit() {
    if (this.form.valid) {
      this.api.login(this.form.value).subscribe({
        next: () => {
          this.errors.email.set('');
          this.errors.password.set('');
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 5);
        },
        error: ({ error }) => {
          this.errors.email.set(error?.email ?? '');
          this.errors.password.set(error?.password ?? '');
        },
      });
    } else {
      this.errors.email.set(
        !this.form.value.email ? 'Email cannot be empty' : '',
      );
      this.errors.password.set(
        !this.form.value.password ? 'Passord cannot be empty' : '',
      );
    }
  }

  private api = inject(ApiService);
  private router = inject(Router);
}
