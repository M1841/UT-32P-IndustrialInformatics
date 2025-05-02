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
export class ProfileComponent implements OnInit {
  user: { name: string; surname: string; email: string } | null = null;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getUserDetails().subscribe({
      next: (data) => {
        this.user = data.body;
      },
      error: (err) => {
        console.error('Failed to fetch user details:', err);
      },
    });
  }
}