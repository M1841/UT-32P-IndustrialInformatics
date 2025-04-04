import { Component, computed, inject, signal } from '@angular/core';

import { ApiService } from '@/services/api/api.service';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    @if (isAuthenticated() && user() !== null) {
      <p>Logged in as: {{ user()!.name }} {{ user()!.surname }}</p>
    } @else {
      <a href="auth/login">Login</a> <br />
      <a href="auth/register">Register (Patient)</a> <br />
      <a href="auth/register/doctor">Register (Doctor)</a>
    }
  `,
  styles: ``,
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

  private api = inject(ApiService);
}
