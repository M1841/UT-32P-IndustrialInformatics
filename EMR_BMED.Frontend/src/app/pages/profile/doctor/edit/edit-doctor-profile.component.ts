import { ApiService } from '@/services/api/api.service';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EMPTY, switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-doctor-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-doctor-profile.html',
  // template: `
  // <div class="edit-profile-container">
  //     <div class="form-group">
  //   <form [formGroup]="detailsForm" (submit)="updateDetails()">
  //     <h1>Update Details</h1>
  //     <div class="form-group">
  //     <label>
  //       Name
  //       <input required formControlName="name" />
  //     </label>
  //     <br />
  //     </div>

  //     <div class="form-group">
  //     <label>
  //       Surname
  //       <input required formControlName="surname" />
  //     </label>
  //     <br />
  //     </div>

  //     <div class="form-group">
  //     <label>
  //       Email
  //       <input required formControlName="email" />
  //       @if (errors.email() !== '') {
  //         <span>{{ errors.email() }}</span>
  //       }
  //     </label>
  //     <br />
  //     </div>

  //     <div class="form-group">
  //     <label>
  //       Phone Number
  //       <input required formControlName="phone" />
  //     </label>
  //     <br />
  //     </div>

  //     <div class="form-group">
  //     <label>
  //       Address
  //       <input required formControlName="address" />
  //     </label>
  //     <br />
  //     </div>

  //     <button
  //       type="submit"
  //       class="nav-button"
  //       [disabled]="!this.detailsForm.valid"
  //     >
  //       Submit
  //     </button>
  //   </form>

  //   <form [formGroup]="passwordForm" (submit)="changePassword()">
  //     <h1>Change Password</h1>
  //     <label>
  //       Old Password
  //       <input required formControlName="oldPassword" type="password" />
  //       @if (errors.password() !== '') {
  //         <span>{{ errors.password() }}</span>
  //       }
  //     </label>
  //     <br />

  //     <label>
  //       New Password
  //       <input required formControlName="newPassword" type="password" />
  //     </label>
  //     <br />

  //     <button
  //       type="submit"
  //       class="nav-button"
  //       [disabled]="!this.passwordForm.valid"
  //     >
  //       Submit
  //     </button>
  //   </form>
  //     </div>
  // </div>
  // `,
  // styles: ``,
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
    email: signal<string>(''),
    password: signal<string>(''),
  };

  updateDetails() {
    if (this.detailsForm.valid) {
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
            phone: res.body.phone,
            address: res.body.address,
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
