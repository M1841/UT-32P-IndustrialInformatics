import { ApiService } from '@/services/api/api.service';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { switchMap, EMPTY } from 'rxjs';

@Component({
  selector: 'app-edit-patient-profile',
  imports: [ReactiveFormsModule],
  template: `

    <div class="edit-profile-container">
      <div class="form-group">

    <form [formGroup]="detailsForm" (submit)="updateDetails()">
      <h1>Update Details</h1>

      <div class="form-group">
      <label>
        Name
        <input required formControlName="name" />
      </label>
      <br />
      </div>

      <div class="form-group">
      <label>
        Surname
        <input required formControlName="surname" />
      </label>
      <br />
      </div>

      <div class="form-group">
      <label>
        Email
        <input required formControlName="email" />
        @if (errors.email() !== '') {
          <span>{{ errors.email() }}</span>
        }
      </label>
      <br />
      </div>

      <div class="form-group">
      <label>
        Phone Number
        <input required formControlName="phone" />
      </label>
      <br />
      </div>

      <div class="form-group">
      <label>
        Citizenship
        <input required formControlName="citizenship" />
      </label>
      <br />
      </div>

      <div class="form-group">
      <label>
        Allergies
        <input required formControlName="allergies" />
      </label>
      <br />
      </div>

      <div class="form-group">
      <label>
        Intolerances
        <input required formControlName="intolerances" />
      </label>
      <br />
      </div>

      <div class="form-group">
      <label>
        Conditions
        <input required formControlName="conditions" />
      </label>
      <br />
      </div>

      <div class="form-group">
      <label>
        Blood Type
        <input required formControlName="blood" />
      </label>
      <br />
      </div>

      <button
        type="submit"
        class="nav-button"
        [disabled]="!this.detailsForm.valid">
        Submit
      </button>

      </form>
      </div>
    </div>

    <div class="edit-password-container">
    <form [formGroup]="passwordForm" (submit)="changePassword()">
      <h1>Change Password</h1>
      
      <div class="form-group">
      <label>
        Old Password
        <input required formControlName="oldPassword" type="password" />
        @if (errors.password() !== '') {
          <span>{{ errors.password() }}</span>
        }
      </label>
      <br />
      </div>
     
      <div class="form-group">
      <label>
        New Password
        <input required formControlName="newPassword" type="password" />
      </label>
      <br />
      </div>

      <button
        type="submit"
        class="nav-button"
        [disabled]="!this.passwordForm.valid">
        Submit
      </button>


  `,
  styles: ``,
})
export class EditPatientProfileComponent {
  readonly patient = signal<any>({});
  readonly detailsForm = new FormGroup({
    name: new FormControl(),
    surname: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    citizenship: new FormControl(),
    allergies: new FormControl(),
    intolerances: new FormControl(),
    conditions: new FormControl(),
    blood: new FormControl(),
  });
  readonly passwordForm = new FormGroup({
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
  });
  readonly errors = {
    email: signal<string>(''),
    password: signal<string>(''),
  };

  updateDetails() {
    if (this.detailsForm.valid) {
      this.api
        .put(`user/patient/${this.patient().id}`, {
          name:
            this.detailsForm.value.name !== this.patient().name
              ? this.detailsForm.value.name
              : null,
          surname:
            this.detailsForm.value.surname !== this.patient().surname
              ? this.detailsForm.value.surname
              : null,
          email:
            this.detailsForm.value.email !== this.patient().email
              ? this.detailsForm.value.email
              : null,
          phone:
            this.detailsForm.value.phone !== this.patient().phone
              ? this.detailsForm.value.phone
              : null,
          citizenship:
            this.detailsForm.value.citizenship !== this.patient().citizenship
              ? this.detailsForm.value.citizenship
              : null,
          allergies:
            this.detailsForm.value.allergies !== this.patient().allergies
              ? this.detailsForm.value.allergies
              : null,
          intolerances:
            this.detailsForm.value.intolerances !== this.patient().intolerances
              ? this.detailsForm.value.intolerances
              : null,
          conditions:
            this.detailsForm.value.conditions !== this.patient().conditions
              ? this.detailsForm.value.conditions
              : null,
          blood:
            this.detailsForm.value.blood !== this.patient().blood
              ? this.detailsForm.value.blood
              : null,
        })
        .subscribe({
          next: () => {
            this.patient.update((p) => {
              return { ...p, ...this.detailsForm.value };
            });
            this.errors.email.set('');
            alert('Details updated successfully');
          },
          error: ({ error }) => {
            this.errors.email.set(error?.email ?? '');
          },
        });
    }
  }

  changePassword() {
    if (this.passwordForm.valid) {
      this.api
        .login({
          email: this.patient().email,
          password: this.passwordForm.value.oldPassword,
        })
        .pipe(
          switchMap((res) => {
            if (res.ok) {
              return this.api.put(`user/patient/${this.patient().id}`, {
                password: this.passwordForm.value.newPassword,
              });
            } else {
              return EMPTY;
            }
          }),
        )
        .subscribe({
          next: () => {
            this.passwordForm.reset();
            this.errors.password.set('');
            alert('Password changed successfully');
          },
          error: ({ error }) => {
            this.errors.password.set(error?.password ?? '');
          },
        });
    }
  }

  ngOnInit() {
    if (this.api.isAuthenticated()) {
      this.api.get<any>('auth/whoami').subscribe({
        next: (res) => {
          this.patient.set(res.body);
          this.detailsForm.setValue({
            name: res.body.name,
            surname: res.body.surname,
            email: res.body.email,
            phone: res.body.phone,
            citizenship: res.body.citizenship,
            allergies: res.body.allergies,
            intolerances: res.body.intolerances,
            conditions: res.body.conditions,
            blood: res.body.blood,
          });
        },
        error: () => {
          window.location.href = '/auth/login';
        },
      });
    } else {
      window.location.href = '/auth/login';
    }
  }

  private api = inject(ApiService);
}
