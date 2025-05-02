import { Component, OnInit } from '@angular/core';
import { ApiService } from '@/services/api/api.service';

@Component({
  selector: 'app-profile',
  imports: [],
  template: `
    <div class="profile-container">
      <h2>User Profile</h2>
      <div *ngIf="user">
        <p><strong>Name:</strong> {{ user?.name }} {{ user?.surname }}</p>
        <p><strong>Email:</strong> {{ user?.email }}</p>
      </div>
      <div *ngIf="!user">
        <p>Loading user details...</p>
      </div>
    </div>
  `,
})
export class ProfileComponent{
  


  readonly user = signal<{ name: string; surname: string } | null>(null);
  readonly isAuthenticated = computed(() => this.api.isAuthenticated());

  ngOnInit() {
    if (this.api.isAuthenticated()) {
      this.api.get<{ name: string; surname: string }>('auth/whoami').subscribe({
        next: (response) => {
          this.user.set(response.body ?? null);
        },
      });
    }
  }


}