import { ApiService } from '@/services/api/api.service';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EMPTY, switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-doctor-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-doctor-profile.html',
})
export class EditDoctorProfileComponent {
  readonly doctor = signal<any>({});
  readonly detailsForm = new FormGroup({
    name: new FormControl(),
    surname: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    address: new FormControl(),
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
        .put(`user/doctor/${this.doctor().id}`, {
          name:
            this.detailsForm.value.name !== this.doctor().name
              ? this.detailsForm.value.name
              : null,
          surname:
            this.detailsForm.value.surname !== this.doctor().surname
              ? this.detailsForm.value.surname
              : null,
          email:
            this.detailsForm.value.email !== this.doctor().email
              ? this.detailsForm.value.email
              : null,
          phone:
            this.detailsForm.value.phone !== this.doctor().phone
              ? this.detailsForm.value.phone
              : null,
          address:
            this.detailsForm.value.address !== this.doctor().address
              ? this.detailsForm.value.address
              : null,
        })
        .subscribe({
          next: () => {
            this.doctor.update((d) => {
              return { ...d, ...this.detailsForm.value };
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
    if (this.passwordForm.valid) {
      this.api
        .login({
          email: this.doctor().email,
          password: this.passwordForm.value.oldPassword,
        })
        .pipe(
          switchMap((res) => {
            if (res.ok) {
              return this.api.put(`user/doctor/${this.doctor().id}`, {
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
          this.doctor.set(res.body);
          this.detailsForm.setValue({
            name: res.body.name,
            surname: res.body.surname,
            email: res.body.email,
            phone: res.body.phone ?? '',
            address: res.body.address ?? '',
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
