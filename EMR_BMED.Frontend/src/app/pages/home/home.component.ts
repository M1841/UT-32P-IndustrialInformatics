import { Component, computed, inject, signal } from '@angular/core';

import { ApiService } from '@/services/api/api.service';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    
    @if (isAuthenticated() && user() !== null) {
      <div class="page-top">
        <div class="header">
          <img src="Header.png" alt="Header" id="header-pic" />
          <div class="image-container"></div>
        </div>
        <div class="nav">
          <a href="" class="nav-button">Home</a> <br/>
          <a href="prescribe" class="nav-button">Prescribe</a> <br />
          <a href="profile" class="nav-button">Profile</a> <br />
          <button class="logout-btn" (click)="handleLogout()">Logout</button>
        </div>
      </div>

      <div class="basic-container">
        <div class="nav-section">
          <p>Logged in as: {{ user()!.name }} {{ user()!.surname }}</p>
          
          <br />
          <br />
        </div>
        <br />
      </div>
      } @else {
        <div class="auth-options">
          <a href="auth/login" class="auth-button">Login</a> <br />
          <a href="auth/register" class="auth-button">Register (Patient)</a>
          <br />
          <a href="auth/register/doctor" class="auth-button"
          >Register (Doctor)</a
          >
        </div>
        }


  <span class="line"></span>
  <div class="page-bottom">
    <div class="footer">
        <div class="icon">
          <a href="/" class="home-icon" style="grid-area: box-1">
              <img src="Logo.png" alt="Home" width="64" height="64" />
          </a>
          <p id="rights" style="grid-area: box-2">All rights reserved.</p>
        </div>
        <div class="info" style="grid-area: box-3">
          <p>This section will contain links and what not</p>
        <div>
      </div>
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
