import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api/api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    @if (isAuthenticated() && user() != null) {
      <div class="page-top">
        <div class="header">
          <img src="Header.png" alt="Header" id="header-pic" />
          <div class="image-container"></div>
        </div>
        <div class="nav">
          <a href="" class="nav-button">Home</a> <br />
          <a href="prescriptions" class="nav-button">Prescriptions</a> <br />
          <a href="medication" class="nav-button">Medication</a> <br />
          <a
            href="{{ user()!.isDoctor ? 'profile/doctor' : 'profile' }}"
            class="nav-button"
            >Profile</a
          >
          <br />
        </div>
      </div>
    }
    <router-outlet />

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
          <div></div>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent {
  readonly user = signal<{
    name: string;
    surname: string;
    isDoctor: boolean;
  } | null>(null);
  readonly isAuthenticated = computed(() => this.api.isAuthenticated());

  ngOnInit() {
    if (this.api.isAuthenticated()) {
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
