import { ApiService } from '@/services/api/api.service';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register.doctor',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="handleSubmit()">
      <h2>Doctor Registration Form</h2>
      <a href="auth/register">Are you a patient?</a> <br />
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
        Medical Field
        <input required type="text" formControlName="medicalField" />
      </label>
      <br />

      <label>
        Phone Number (Optional)
        <input type="text" formControlName="phoneNumber" />
      </label>
      <br />

      <label>
        Address (Optional)
        <input type="text" formControlName="address" />
      </label>
      <br />

      <button type="submit">Register</button>
    </form>
  `,
  styles: ``,
})
export class RegisterDoctorComponent {
  readonly form = new FormGroup({
    name: new FormControl(),
    surname: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    gender: new FormControl(),
    birthday: new FormControl(),
    medicalField: new FormControl(),
    phoneNumber: new FormControl(),
    address: new FormControl(),
  });
  readonly errors = {
    name: signal<string>(''),
    surname: signal<string>(''),
    email: signal<string>(''),
    password: signal<string>(''),
    gender: signal<string>(''),
    birthday: signal<string>(''),
    medicalField: signal<string>(''),
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
        >('auth/register/doctor', this.form.value)
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
      this.errors.medicalField.set(
        !this.form.value.medicalField ? 'Medical field cannot be empty' : '',
      );
    }
  }

  private api = inject(ApiService);
  private router = inject(Router);
}
