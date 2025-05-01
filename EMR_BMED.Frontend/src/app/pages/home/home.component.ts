import { Component, computed, inject, signal } from '@angular/core';

import { ApiService } from '@/services/api/api.service';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
  <div class="basic-container">
    <a href="/" class="home-icon">
      <img src="logo.jpg" alt="Home" width="64" height="64" >
    </a>

    @if (isAuthenticated() && user() !== null) {
      <div class="auth-section">
        <p>Logged in as: {{ user()!.name }} {{ user()!.surname }}</p>
        <a href="prescribe" class="nav-button">Prescribe</a> <br />
        <a href="profile" class="nav-button">Profile</a> <br /> <br /> <br />
        <button class="logout-btn" (click)="handleLogout()">Logout</button>
      </div>
    } @else {
      <div class ="auth-options">
        <a href="auth/login" class="nav-button">Login</a> <br />
        <a href="auth/register" class="nav-button">Register (Patient)</a> <br />
        <a href="auth/register/doctor" class="nav-button">Register (Doctor)</a>
      </div>
    }

    <br />
    <a href="test" class="nav-button">Test</a> <br />
  </div>
  `,
})
export class HomeComponent {
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

  handleLogout() {
    this.api.logout();
  }

  private api = inject(ApiService);
}
