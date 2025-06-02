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
      <div class="profile-details">
      @if (patient()) {
        <p><strong>Name:</strong> {{ patient()!.name }} {{ patient()!.surname }}</p>
        
        <p><strong>Email address:</strong> {{ patient()!.email }}</p>
        <p><strong>Gender:</strong> {{ patient()!.gender }}</p>
        <p><strong>Birthday:</strong> {{ patient()?.birthday }}</p>
        @if (patient()!.phone) {
          <p><strong>Phone number:</strong> {{ patient()!.phone }}</p>
        }
        @if (patient()!.allergies) {
          <p><strong>Allergies:</strong> {{ patient()!.allergies }}</p>
        }
        @if (patient()!.intolerances) {
          <p><strong>Intolerances:</strong> {{ patient()!.intolerances }}</p>
        }
        @if (patient()!.conditions) {
          <p><strong>Conditions:</strong> {{ patient()!.conditions }}</p>
        }
        @if (patient()!.blood) {
          <p><strong>Blood type:</strong> {{ patient()!.blood }}</p>
        }
        @if (patient()!.citizenship) {
          <p><strong>Citizenship:</strong> {{ patient()!.citizenship }}</p>
        }
        @if (patient()!.socialNumber) {
          <p><strong>Social number:</strong> {{ patient()!.socialNumber }}</p>
        
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
      window.location.href = '/auth/login';
    }
  }
  private api = inject(ApiService);
}
