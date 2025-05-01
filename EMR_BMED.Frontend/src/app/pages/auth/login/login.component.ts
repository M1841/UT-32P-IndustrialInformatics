import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '@/services/api/api.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  template: `
  <div class="login-container">
    <a href="/" class="home-icon">
      <img src="logo.jpg" alt="Home" width="64" height="64" />
    </a>

    <form [formGroup]="form" (ngSubmit)="handleSubmit()">
      <h2><b>Login Form</b></h2>
      <a href="auth/register"class="link">Don't have an account?</a><br />
      <br />
      
      <div class="form-group">
        <label for="email">Email</label>
        <div class="input-wrapper">
          <input required id="email" type="text" formControlName="email" />
          @if (errors.email() !== '') {
            <span>{{ errors.email() }}</span>
          }
        </div>
      </div>
      <br />

      <div class="form-group">
        <label for="password">Password</label>
        <div class="input-wrapper">
          <input required id="password" type="password" formControlName="password" />
          @if (errors.password() !== '') {
           <span>{{ errors.password() }}</span>
          }
        </div>
      </div>
      <button type="submit" class="nav-button">Login</button>
    </form>
  </div> 

`,
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
          this.router.navigate(['/']);
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
