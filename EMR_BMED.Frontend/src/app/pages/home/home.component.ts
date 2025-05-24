import { Component, computed, inject, signal } from '@angular/core';

import { ApiService } from '@/services/api/api.service';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    @if (isAuthenticated() && user() !== null) {
      <div class="basic-container">
        <div class="nav-section">
          <h1>
            Welcome
            <strong>
              {{ user()!.isDoctor ? 'Dr. ' : '' }}{{ user()!.name }}
              {{ user()!.surname }}</strong
            >!
          </h1>
        </div>
        <br />
      </div>
    } @else {
      <div class="auth-options">
        <a href="auth/login" class="auth-button">Login</a> <br />
        <a href="auth/register" class="auth-button">Register (Patient)</a>
        <br />
        <a href="auth/register/doctor" class="auth-button">Register (Doctor)</a>
      </div>
    }
  `,
})
export class HomeComponent {
  readonly user = signal<{
    name: string;
    surname: string;
    isDoctor: boolean;
  } | null>(null);
  readonly isAuthenticated = computed(() => this.api.isAuthenticated());

  ngOnInit() {
    if (this.isAuthenticated()) {
      this.api
        .get<{
          name: string;
          surname: string;
          isDoctor: boolean;
        }>('auth/whoami')
        .subscribe({
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
