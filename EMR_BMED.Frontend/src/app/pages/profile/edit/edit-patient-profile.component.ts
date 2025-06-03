import { ApiService } from '@/services/api/api.service';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { switchMap, EMPTY } from 'rxjs';

@Component({
  selector: 'app-edit-patient-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-patient.html',
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
    name: signal<string>(''),
    surname: signal<string>(''),
    email: signal<string>(''),
    password: signal<string>(''),
  };

  updateDetails() {
    if (
      this.detailsForm.valid &&
      !!this.detailsForm.value.name?.trim() &&
      !!this.detailsForm.value.surname?.trim() &&
      !!this.detailsForm.value.email?.trim()
    ) {
      this.api
        .put(`user/patient/${this.patient().id}`, {
          name:
            this.detailsForm.value.name !== this.patient().name
              ? this.detailsForm.value.name.trim()
              : null,
          surname:
            this.detailsForm.value.surname !== this.patient().surname
              ? this.detailsForm.value.surname.trim()
              : null,
          email:
            this.detailsForm.value.email !== this.patient().email
              ? this.detailsForm.value.email.trim()
              : null,
          phone:
            this.detailsForm.value.phone !== this.patient().phone
              ? this.detailsForm.value.phone.trim()
              : null,
          citizenship:
            this.detailsForm.value.citizenship !== this.patient().citizenship
              ? this.detailsForm.value.citizenship.trim()
              : null,
          allergies:
            this.detailsForm.value.allergies !== this.patient().allergies
              ? this.detailsForm.value.allergies.trim()
              : null,
          intolerances:
            this.detailsForm.value.intolerances !== this.patient().intolerances
              ? this.detailsForm.value.intolerances.trim()
              : null,
          conditions:
            this.detailsForm.value.conditions !== this.patient().conditions
              ? this.detailsForm.value.conditions.trim()
              : null,
          blood:
            this.detailsForm.value.blood !== this.patient().blood
              ? this.detailsForm.value.blood.trim()
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
    } else {
      this.errors.name.set(
        !this.detailsForm.value.name?.trim()
          ? 'First name cannot be empty'
          : '',
      );
      this.errors.surname.set(
        !this.detailsForm.value.surname?.trim()
          ? 'Last name cannot be empty'
          : '',
      );
      this.errors.email.set(
        !this.detailsForm.value.email?.trim() ? 'Email cannot be empty' : '',
      );
    }
  }

  changePassword() {
    if (
      this.passwordForm.valid &&
      this.passwordForm.value.newPassword?.trim()
    ) {
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
    } else {
      this.errors.password.set(
        !this.passwordForm.value.newPassword?.trim()
          ? 'Password cannot be empty'
          : '',
      );
    }
  }

  ngOnInit() {
    if (this.api.isAuthenticated()) {
      this.api.get<any>('auth/whoami').subscribe({
        next: (res) => {
          console.log(res.body);
          this.patient.set(res.body);
          this.detailsForm.setValue({
            name: res.body.name,
            surname: res.body.surname,
            email: res.body.email,
            phone: res.body.phone,
            citizenship: res.body.citizenship,
            allergies: res.body.allergies ?? '',
            intolerances: res.body.intolerances ?? '',
            conditions: res.body.conditions ?? '',
            blood: res.body.blood ?? '',
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
