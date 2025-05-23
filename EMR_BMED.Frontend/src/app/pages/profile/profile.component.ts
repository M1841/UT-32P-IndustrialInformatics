import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '@/services/api/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <a href="/" class="home-icon">
        <img src="Logo.png" alt="Home" width="64" height="64" />
      </a>

      <h2>Patient Profile</h2>
      @if (patient()) {
        <p>Name: {{ patient()!.name }} {{ patient()!.surname }}</p>
        <p>Email address: {{ patient()!.email }}</p>
        <p>Gender: {{ patient()!.gender }}</p>
        <p>Birthday: {{ patient()?.birthday }}</p>
        @if (patient()!.phone) {
          <p>Phone number: {{ patient()!.phone }}</p>
        }
        @if (patient()!.allergies) {
          <p>Allergies: {{ patient()!.allergies }}</p>
        }
        @if (patient()!.intolerances) {
          <p>Intolerances: {{ patient()!.intolerances }}</p>
        }
        @if (patient()!.conditions) {
          <p>Conditions: {{ patient()!.conditions }}</p>
        }
        @if (patient()!.blood) {
          <p>Blood type: {{ patient()!.blood }}</p>
        }
        @if (patient()!.citizenship) {
          <p>Citizenship: {{ patient()!.citizenship }}</p>
        }
        @if (patient()!.socialNumber) {
          <p>Social number: {{ patient()!.socialNumber }}</p>
        }
      } @else {
        <p>Loading user details...</p>
      }
    </div>
  `,
})
export class ProfileComponent implements OnInit {
  readonly patient = signal<{
    email: string;
    name: string;
    surname: string;
    gender: string;
    birthday: string;
    phone: string;
    allergies: string;
    intolerances: string;
    conditions: string;
    blood: string;
    citizenship: string;
    socialNumber: string;
  } | null>(null);
  readonly isAuthenticated = computed(() => this.api.isAuthenticated());

  ngOnInit() {
    if (this.api.isAuthenticated()) {
      this.api
        .get<{
          email: string;
          name: string;
          surname: string;
          gender: string;
          birthday: Date;
          phone: string;
          allergies: string;
          intolerances: string;
          conditions: string;
          blood: string;
          citizenship: string;
          socialNumber: string;
        }>('auth/whoami')
        .subscribe({
          next: (response) => {
            if (response.body) {
              const bday = new Date(response.body.birthday);
              const bdayString = `${bday.getDate()}/${bday.getMonth()}/${bday.getFullYear()}`;
              this.patient.set({
                ...response.body,
                birthday: bdayString,
              });
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
      this.router.navigate(['/auth/login']);
      window.location.href = '/auth/login';
    }
  }
  private api = inject(ApiService);
  private router = inject(Router);
}
