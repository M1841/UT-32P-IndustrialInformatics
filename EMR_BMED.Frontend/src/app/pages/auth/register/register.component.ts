import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ApiService } from '@/services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: `./register.html`,
})
export class RegisterComponent {
  readonly form = new FormGroup({
    name: new FormControl(),
    surname: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    gender: new FormControl(),
    birthday: new FormControl(),
    phoneNumber: new FormControl(),
    allergies: new FormControl(),
    intolerances: new FormControl(),
    conditions: new FormControl(),
    bloodType: new FormControl(),
    socialNumber: new FormControl(),
    citizenship: new FormControl(),
  });
  readonly errors = {
    name: signal<string>(''),
    surname: signal<string>(''),
    email: signal<string>(''),
    password: signal<string>(''),
    gender: signal<string>(''),
    birthday: signal<string>(''),
    socialNumber: signal<string>(''),
    citizenship: signal<string>(''),
  };

  handleSubmit() {
    if (
      this.form.valid &&
      !!this.form.value.name?.trim() &&
      !!this.form.value.surname?.trim() &&
      !!this.form.value.email?.trim() &&
      !!this.form.value.password?.trim() &&
      !!this.form.value.gender?.trim() &&
      new Date() >= new Date(this.form.value.birthday?.trim())
    ) {
      this.api
        .post<
          {
            error?: {
              email?: string;
              password?: string;
            };
          },
          typeof this.form.value
        >('auth/register/patient', this.form.value)
        .subscribe({
          next: () => {
            this.api
              .login({
                email: this.form.value.email,
                password: this.form.value.password,
              })
              .subscribe({
                next: () => {
                  this.router.navigate(['/']);
                  window.location.href = '/';
                },
                error: ({ error }) => {
                  console.error(error);
                },
              });
          },
          error: ({ error }) => {
            this.errors.email.set(error?.email ?? '');
            this.errors.password.set(error?.password ?? '');
          },
        });
    }
    this.errors.name.set(
      !this.form.value.name?.trim() ? 'First name cannot be empty' : '',
    );
    this.errors.surname.set(
      !this.form.value.surname?.trim() ? 'Last name cannot be empty' : '',
    );
    this.errors.email.set(
      !this.form.value.email?.trim() ? 'Email cannot be empty' : '',
    );
    this.errors.password.set(
      !this.form.value.password?.trim() ? 'Password cannot be empty' : '',
    );
    this.errors.gender.set(
      !this.form.value.gender?.trim() ? 'Gender cannot be empty' : '',
    );
    this.errors.birthday.set(
      !this.form.value.birthday?.trim()
        ? 'Birthday cannot be empty'
        : new Date() < new Date(this.form.value.birthday?.trim())
          ? 'Birthday cannot be in the future'
          : '',
    );
    this.errors.citizenship.set(
      !this.form.value.citizenship?.trim() ? 'Citizenship cannot be empty' : '',
    );
    this.errors.socialNumber.set(
      !this.form.value.socialNumber?.trim()
        ? 'Social Number cannot be empty'
        : '',
    );
  }

  private api = inject(ApiService);
  private router = inject(Router);
}
