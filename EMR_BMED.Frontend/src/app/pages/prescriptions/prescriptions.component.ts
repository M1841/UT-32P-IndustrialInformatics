import { Component, computed, inject, signal } from '@angular/core';

import { ApiService } from '@/services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prescriptions',
  imports: [],
  template: `
    @if (user() != null) {
      <div style="padding-left: 3rem; padding-right: 3rem">
        <h2>Your prescriptions:</h2>
        @if (this.user()!.isDoctor) {
          <a href="prescribe" class="nav-button">New Prescription</a> <br />
        }
        <ul>
          @for (prescription of prescriptions(); track $index) {
            <li>
              <strong>CAS:</strong> {{ prescription.cas }}<br />
              <strong>CUI:</strong> {{ prescription.cui }}<br />
              <strong>Days Number:</strong> {{ prescription.daysNumber }}<br />
              <strong>Diagnostic:</strong> {{ prescription.diagnostic }}<br />
              <strong>Doctor:</strong> {{ prescription.doctor.name }}
              {{ prescription.doctor.surname }}<br />
              <strong>Issued:</strong> {{ prescription.issued.toDateString()
              }}<br />
              <strong>Medical Unit:</strong> {{ prescription.medUnit }}<br />
              <strong>Patient:</strong> {{ prescription.patient.name }}
              {{ prescription.patient.surname }}
            </li>
            <hr />
          }
        </ul>
      </div>
    }
  `,
  styles: ``,
})
export class PrescriptionsComponent {
  readonly user = signal<{ id: string; isDoctor: boolean } | null>(null);
  readonly prescriptions = signal<
    {
      cas: string;
      cui: string;
      daysNumber: string;
      diagnostic: string;
      doctor: { name: string; surname: string };
      issued: Date;
      medUnit: string;
      patient: { name: string; surname: string };
    }[]
  >([]);
  readonly isAuthenticated = computed(() => this.api.isAuthenticated());

  ngOnInit() {
    if (this.api.isAuthenticated()) {
      this.api.get<{ id: string; isDoctor: boolean }>('auth/whoami').subscribe({
        next: (response) => {
          if (
            response.body?.id === undefined ||
            !response.body?.isDoctor === undefined
          ) {
            this.router.navigate(['/auth/login']);
          } else {
            this.user.set({
              id: response.body.id,
              isDoctor: response.body.isDoctor,
            });
            this.api
              .get<
                {
                  cas: string;
                  cui: string;
                  daysNumber: string;
                  diagnostic: string;
                  doctor: { name: string; surname: string };
                  issued: Date;
                  medUnit: string;
                  patient: { name: string; surname: string };
                }[]
              >(
                `prescription/${this.user()!.isDoctor ? 'doctor' : 'patient'}/${this.user()!.id}`,
              )
              .subscribe({
                next: (response) => {
                  console.log(response.body);
                  if (!!response.body) {
                    this.prescriptions.set(
                      response.body.map((prescription) => {
                        return {
                          ...prescription,
                          issued: new Date(prescription.issued),
                        };
                      }),
                    );
                  }
                },
              });
          }
        },
      });
    }
  }
  private api = inject(ApiService);
  private router = inject(Router);
}
