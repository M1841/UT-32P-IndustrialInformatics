import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '@/services/api/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <h2>Patient Profile</h2>
      <div *ngIf="patient()">
        Name: {{ patient()?.name }} {{ patient()?.surname }}
        Email:{{ patient()?.email }}
        Gender: {{ patient()?.gender }}
        Birthday: {{ patient()?.birthday }}
        <div *ngIf="patient()?.phone">
          Phone: {{ patient()?.phone }}
        </div>
        <div *ngIf="patient()?.allergies">
          Allergies: {{ patient()?.allergies }}
        </div>
        <div *ngIf="patient()?.intolerances">
          Intolerances: {{ patient()?.intolerances }}
        </div>
        <div *ngIf="patient()?.conditions">
          Conditions: {{ patient()?.conditions }}
        </div>
        <div *ngIf="patient()?.blood">
          Blood: {{ patient()?.blood }}
        </div>
        <div *ngIf="patient()?.citizenship">
          Citizenship: {{ patient()?.citizenship }}
        </div>
        <div *ngIf="patient()?.socialNumber">
          Social Number: {{ patient()?.socialNumber }}
        </div>
        <br />
      </div>
      <div *ngIf="!patient()">
        <p>Loading user details...</p>
      </div>
    </div>
  `,
})

export class ProfileComponent implements OnInit {
  
  readonly patient = signal<{ email: string; name: string; surname: string;  gender: string; birthday: Date; phone: string; allergies: string; intolerances: string; conditions: string; blood: string; citizenship: string; socialNumber: string;} | null>(null);
  readonly isAuthenticated = computed(() => this.api.isAuthenticated());

ngOnInit() {
  if (this.api.isAuthenticated()) {
    this.api.get<{ email: string; name: string; surname: string; gender: string; birthday: string }>('auth/whoami').subscribe({
      next: (response) => {
        if (response.body) {
          this.patient.set({
            ...response.body,
            birthday: new Date(response.body.birthday),
            phone: '',
            allergies: '',
            intolerances: '',
            conditions: '',
            blood: '',
            citizenship: '',
            socialNumber: '',
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
  }
  else{
    this.router.navigate(['/auth/login']);
  }
}
  private api = inject(ApiService);
  private router = inject(Router);
}
