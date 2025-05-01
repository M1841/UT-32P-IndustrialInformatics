import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ApiService } from '@/services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  template: `
  <div class="register-container">
    <a href="/" class="home-icon">
      <img src="logo.jpg" alt="Home" width="64" height="64" />
    </a>

    <form [formGroup]="form" (ngSubmit)="handleSubmit()">
      <h2><b>Patient Registration Form</b></h2>
      <br />
      <a href="auth/register/doctor" class="link">Are you a doctor?</a> <br />
      <br />
      <a href="auth/login" class="link">Already have an account?</a> <br />
      <br />

      <div class="form-group">
        <label for="name">First Name</label>
        <div class="input-wrapper">
          <input required id="name" type="text" formControlName="name" />
          @if (errors.name() !== '') {
            <span>{{ errors.name() }}</span>
          }
        </div>
      </div>

      <div class="form-group">
        <label for="surname">Last Name</label>
        <div class="input-wrapper">
          <input required id="surname" type="text" formControlName="surname" />
          @if (errors.surname() !== '') {
            <span>{{ errors.surname() }}</span>
          }
        </div>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <div class="input-wrapper">
          <input required id="email" type="text" formControlName="email" />
          @if (errors.email() !== '') {
            <span>{{ errors.email() }}</span>
          }
        </div>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <div class="input-wrapper">
          <input required id="password" type="password" formControlName="password" />
          @if (errors.password() !== '') {
            <span>{{ errors.password() }}</span>
          }
        </div>
      </div>

      <div class="form-group">
        <label for="gender">Gender</label>
        <div class="input-wrapper">
          <select required formControlName="gender">
            @for (gender of ['Female', 'Male', 'Other']; track $index) {
            <option value="{{ gender }}">{{ gender }}</option>
            }
          </select>
          @if (errors.gender() !== '') {
            <span>{{ errors.gender() }}</span>
          }
        </div>
      </div>

      <div class="form-group">
        <label for ="birthday">Birthday</label>
        <div class="input-wrapper">
          <input required id="birthday" type="date" formControlName="birthday" />
          @if (errors.birthday() !== '') {
            <span>{{ errors.birthday() }}</span>
          }
        </div>
      </div>

      <div class="form-group">
        <label for="phone">Phone Number (Optional)</label>
        <div class="input-wrapper">
          <input id="phone" type="text" formControlName="phoneNumber" />
        </div>
      </div>

      <div class="form-group">
        <label for="allergies">Allergies (Optional)</label>
        <div class="input-wrapper">
          <textarea id="allergies" formControlName="allergies"></textarea>
        </div>
      </div>

      <div class="form-group">
        <label for="intolerances">Intolerances (Optional)</label>
        <div class="input-wrapper">
          <textarea id="intolerances" formControlName="intolerances"></textarea>
        </div>
      </div>

      <div class="form-group">
        <label for="conditions">Conditions (Optional)</label>
        <div class="input-wrapper">
          <textarea id="conditions" formControlName="conditions"></textarea>
        </div>
      </div>

      <div class="form-group">
        <label for="bloodType">Blood Type (Optional)</label>
        <div class="input-wrapper">
          <select id="bloodType" formControlName="bloodType">
            <option selected value>-</option>
            @for (bloodType of ['A', 'B', 'AB', 'O']; track $index) {
              <option value="{{ bloodType }}">{{ bloodType }}</option>
            }
          </select>
        </div>
      </div>

      <div class="form-group">
        <label for="socialNumber">Social Number (Optional)</label>
        <div class="input-wrapper">
          <input id="socialNumber" type="text" formControlName="socialNumber" />
        </div>
      </div>
      
      <div class="form-group">
        <label for="citizenship">Citizenship (Optional)</label>
        <div class="input-wrapper">
          <input id="citizenship" type="text" formControlName="citizenship" />
        </div>
      </div>

      <button type="submit" class="nav-button">Register</button>
    </form>
  </div>
  `,
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
