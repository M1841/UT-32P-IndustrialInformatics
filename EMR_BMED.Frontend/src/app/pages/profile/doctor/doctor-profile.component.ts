import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ApiService } from '@/services/api/api.service';

@Component({
  selector: 'app-doctor-profile',
  imports: [RouterLink],
  template: `
    <div class="profile-container">
      <a href="/" class="home-icon">
        <img src="Logo.png" alt="Home" width="64" height="64" />
      </a>

      <h2>Doctor Profile</h2>
      @if (doctor()) {
        <p>Name: Dr. {{ doctor()!.name }} {{ doctor()!.surname }}</p>
        <p>Medical Field: {{ doctor()!.medicalField }}</p>
        <p>Email address: {{ doctor()!.email }}</p>
        <p>Gender: {{ doctor()!.gender }}</p>
        <p>Birthday: {{ doctor()!.birthday }}</p>
        @if (doctor()!.phone) {
          <p>Phone number: {{ doctor()!.phone }}</p>
        }
        @if (doctor()!.address) {
          <p>Address: {{ doctor()!.address }}</p>
        }
      } @else {
        <p>Loading user details...</p>
      }
      <a [routerLink]="['edit']" class="nav-button">Edit</a>
      <button class="logout-btn">Delete Account</button>
    </div>
  `,
  styles: ``,
})
export class DoctorProfileComponent {
  readonly doctor = signal<any>({});

  ngOnInit() {
    if (this.api.isAuthenticated()) {
      this.api.get<any>('auth/whoami').subscribe((res) => {
        if (res.body.isDoctor) {
          this.doctor.set(res.body);
        } else {
          window.location.href = '/auth/login';
        }
      });
    } else {
      window.location.href = '/auth/login';
    }
  }

  private api = inject(ApiService);
  private router = inject(Router);
}
