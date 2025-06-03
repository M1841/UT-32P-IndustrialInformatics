import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '@/services/api/api.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
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
    if (
      this.form.valid &&
      !!this.form.value.email?.trim() &&
      !!this.form.value.password?.trim()
    ) {
      this.api
        .login({
          email: this.form.value.email.trim(),
          password: this.form.value.password.trim(),
        })
        .subscribe({
          next: () => {
            this.errors.email.set('');
            this.errors.password.set('');
            this.router.navigate(['/']);
            window.location.href = '/';
          },
          error: ({ error }) => {
            this.errors.email.set(error?.email ?? '');
            this.errors.password.set(error?.password ?? '');
          },
        });
    } else {
      this.errors.email.set(
        !this.form.value.email?.trim() ? 'Email cannot be empty' : '',
      );
      this.errors.password.set(
        !this.form.value.password?.trim() ? 'Passord cannot be empty' : '',
      );
    }
  }

  private api = inject(ApiService);
  private router = inject(Router);
}
