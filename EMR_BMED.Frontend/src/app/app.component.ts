import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from './services/api/api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  // template: `
  //   @if (isAuthenticated() && user() != null) {
  //     <div class="page-top">
  //       <div class="header">
  //         <img src="Header.png" alt="Header" id="header-pic" />
  //         <div class="image-container"></div>
  //       </div>
  //       <div class="nav">
  //         <a [routerLink]="['']" class="nav-button">Home</a> <br />
  //         <a [routerLink]="['prescriptions']" class="nav-button"
  //           >Prescriptions</a
  //         >
  //         <br />
  //         <a [routerLink]="['medication']" class="nav-button">Medication</a>
  //         <br />
  //         <a
  //           [routerLink]="[user()!.isDoctor ? 'profile/doctor' : 'profile']"
  //           class="nav-button"
  //           >Profile</a
  //         >
  //         <br />
  //         <button class="logout-btn" (click)="handleLogout()">Logout</button>
  //       </div>
  //     </div>
  //   }
  //   <router-outlet />

  //   <div class="page-bottom">
  //     <div class="footer">
  //       <div class="icon">
  //         <a [routerLink]="['/']" class="home-icon" style="grid-area: box-1">
  //           <img src="Logo.png" alt="Home" width="96" height="96" />
  //         </a>
  //         <p id="rights" style="grid-area: box-2">All rights reserved.</p>
  //       </div>
  //       <div class="info" style="grid-area: box-3">
  //         <div>Outer links</div>
  //         <div>Inner links</div>
  //         <div>Contact info</div>
  //       </div>
  //     </div>
  //   </div>
  // `,
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
