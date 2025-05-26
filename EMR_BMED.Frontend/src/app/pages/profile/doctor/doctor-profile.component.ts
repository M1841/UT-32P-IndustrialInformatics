import { afterNextRender, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ApiService } from '@/services/api/api.service';

@Component({
  selector: 'app-doctor-profile',
  imports: [RouterLink],
  template: `
    <div class="profile-container">
      <a href="/" class="home-icon">
        <img src="Logo.png" alt="Home" width="64" height="64" />
      </a>

      <h2>Doctor Profile</h2>
      @if (doctor()) {
        <p>Name: Dr. {{ doctor()!.name }} {{ doctor()!.surname }}</p>
        <p>Medical Field: {{ doctor()!.medicalField }}</p>
        <p>Email address: {{ doctor()!.email }}</p>
        <p>Gender: {{ doctor()!.gender }}</p>
        <p>Birthday: {{ doctor()!.birthday }}</p>
        @if (doctor()!.phone) {
          <p>Phone number: {{ doctor()!.phone }}</p>
        }
        @if (doctor()!.address) {
          <p>Address: {{ doctor()!.address }}</p>
        }

        <a [routerLink]="['edit']" class="nav-button">Edit</a>

        <button (click)="openDeleteDialog()" class="logout-btn">
          Delete Account
        </button>
        <dialog>
          <form method="dialog">
            <p>
              Are you sure you want to delete your account? This action is
              permanent!
            </p>
            <menu style="padding:0">
              <button class="nav-button">No, cancel</button>
              <button (click)="handleDelete()" class="logout-btn">
                Yes, delete
              </button>
            </menu>
          </form>
        </dialog>
      } @else {
        <p>Loading user details...</p>
      }
    </div>
  `,
  styles: ``,
})
export class DoctorProfileComponent {
  readonly doctor = signal<any>({});

  openDeleteDialog() {
    const dialog = document.querySelector('dialog') as HTMLDialogElement;
    dialog.showModal();
  }
  handleDelete() {
    this.api.delete(`user/${this.doctor()!.id}`).subscribe(() => {
      alert('Your account has been deleted');
      this.api.logout();
    });
  }

  ngOnInit() {
    if (this.api.isAuthenticated()) {
      this.api.get<any>('auth/whoami').subscribe({
        next: (res) => {
          if (res.body.isDoctor) {
            this.doctor.set(res.body);
          } else {
            window.location.href = '/auth/login';
          }
        },
      });
    } else {
      window.location.href = '/auth/login';
    }
  }

  private api = inject(ApiService);
}
