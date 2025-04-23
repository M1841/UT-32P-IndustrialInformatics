import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ApiService } from '@/services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="handleSubmit()">
      <h2>Patient Registration Form</h2>
      <a href="auth/register/doctor">Are you a doctor?</a> <br />
      <a href="auth/login">Already have an account?</a> <br />

      <label>
        First Name
        <input required type="text" formControlName="name" />

        @if (errors.name() !== '') {
          <span>{{ errors.name() }}</span>
        }
      </label>
      <br />

      <label>
        Last Name
        <input required type="text" formControlName="surname" />

        @if (errors.surname() !== '') {
          <span>{{ errors.surname() }}</span>
        }
      </label>
      <br />

      <label>
        Email
        <input required type="email" formControlName="email" />

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

      <label>
        Gender
        <select required formControlName="gender">
          @for (gender of ['Female', 'Male', 'Other']; track $index) {
            <option value="{{ gender }}">{{ gender }}</option>
          }
        </select>

        @if (errors.gender() !== '') {
          <span>{{ errors.gender() }}</span>
        }
      </label>
      <br />

      <label>
        Birthday
        <input required type="date" formControlName="birthday" />

        @if (errors.birthday() !== '') {
          <span>{{ errors.birthday() }}</span>
        }
      </label>
      <br />

      <label>
        Phone Number (Optional)
        <input type="text" formControlName="phoneNumber" />
      </label>
      <br />

      <label>
        Allergies (Optional)
        <textarea formControlName="allergies"></textarea>
      </label>
      <br />

      <label>
        Intolerances (Optional)
        <textarea formControlName="intolerances"></textarea>
      </label>
      <br />

      <label>
        Conditions (Optional)
        <textarea formControlName="conditions"></textarea>
      </label>
      <br />

      <label>
        Blood Type (Optional)
        <select formControlName="bloodType">
          <option selected value>-</option>
          @for (bloodType of ['A', 'B', 'AB', 'O']; track $index) {
            <option value="{{ bloodType }}">{{ bloodType }}</option>
          }
        </select>
      </label>
      <br />

      <button type="submit">Register</button>
    </form>
  `,
  styles: ``,
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
  });
  readonly errors = {
    name: signal<string>(''),
    surname: signal<string>(''),
    email: signal<string>(''),
    password: signal<string>(''),
    gender: signal<string>(''),
    birthday: signal<string>(''),
  };

  handleSubmit() {
    if (this.form.valid) {
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
    } else {
      this.errors.name.set(
        !this.form.value.name ? 'First name cannot be empty' : '',
      );
      this.errors.surname.set(
        !this.form.value.surname ? 'Last name cannot be empty' : '',
      );
      this.errors.email.set(
        !this.form.value.email ? 'Email cannot be empty' : '',
      );
      this.errors.password.set(
        !this.form.value.password ? 'Password cannot be empty' : '',
      );
      this.errors.gender.set(
        !this.form.value.gender ? 'Gender cannot be empty' : '',
      );
      this.errors.birthday.set(
        !this.form.value.birthday ? 'Birthday cannot be empty' : '',
      );
    }
  }

  private api = inject(ApiService);
  private router = inject(Router);
}
