import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '@/services/api/api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  template: `
    <div class="profile-container">
      <a href="/" class="home-icon">
        <img src="Logo.png" alt="Home" width="64" height="64" />
      </a>

      <h2>Patient Profile</h2>
      @if (patient()) {
        <p>Name: {{ patient()!.name }} {{ patient()!.surname }}</p>
        <p>Email address: {{ patient()!.email }}</p>
        <p>Gender: {{ patient()!.gender }}</p>
        <p>Birthday: {{ patient()?.birthday }}</p>
        @if (patient()!.phone) {
          <p>Phone number: {{ patient()!.phone }}</p>
        }
        @if (patient()!.allergies) {
          <p>Allergies: {{ patient()!.allergies }}</p>
        }
        @if (patient()!.intolerances) {
          <p>Intolerances: {{ patient()!.intolerances }}</p>
        }
        @if (patient()!.conditions) {
          <p>Conditions: {{ patient()!.conditions }}</p>
        }
        @if (patient()!.blood) {
          <p>Blood type: {{ patient()!.blood }}</p>
        }
        @if (patient()!.citizenship) {
          <p>Citizenship: {{ patient()!.citizenship }}</p>
        }
        @if (patient()!.socialNumber) {
          <p>Social number: {{ patient()!.socialNumber }}</p>
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
})
export class ProfileComponent implements OnInit {
  readonly patient = signal<any>(null);
  readonly isAuthenticated = computed(() => this.api.isAuthenticated());

  openDeleteDialog() {
    const dialog = document.querySelector('dialog') as HTMLDialogElement;
    dialog.showModal();
  }
  handleDelete() {
    this.api.delete(`user/${this.patient()!.id}`).subscribe(() => {
      alert('Your account has been deleted');
      this.api.logout();
    });
  }

  ngOnInit() {
    if (this.api.isAuthenticated()) {
      this.api.get<any>('auth/whoami').subscribe({
        next: (response) => {
          if (response.body) {
            this.patient.set(response.body);
          } else {
            this.patient.set(null);
          }
        },
        error: (err) => {
          console.error('Failed to fetch user details:', err);
          this.patient.set(null);
        },
      });
    } else {
      // this.router.navigate(['/auth/login']);
      window.location.href = '/auth/login';
    }
  }
  private api = inject(ApiService);
}
