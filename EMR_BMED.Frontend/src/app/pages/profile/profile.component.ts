import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '@/services/api/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.html',
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
