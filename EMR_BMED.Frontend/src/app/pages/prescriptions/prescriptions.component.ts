import { Component, computed, inject, signal } from '@angular/core';

import { ApiService } from '@/services/api/api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-prescriptions',
  imports: [RouterLink],
  template: `
    @if (user() != null) {
      <div style="padding-left: 3rem; padding-right: 3rem">
        <h2>Your prescriptions:</h2>
        @if (this.user()!.isDoctor) {
          <a [routerLink]="['create']" class="nav-button">New Prescription</a>
          <br />
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
              <strong>Medication:</strong>
              @for (medName of prescription.medicationNames; track $index) {
                {{ medName }}
                @if ($index + 1 < prescription.medicationNames.length) {
                  ,
                }
              }
              <br />
              <strong>Patient:</strong> {{ prescription.patient.name }}
              {{ prescription.patient.surname }}
              @if (this.user()!.isDoctor) {
                <br />
                <a
                  [routerLink]="['edit']"
                  [queryParams]="{
                    id: prescription.id,
                  }"
                  ><strong>Edit</strong></a
                >
                <br />
                <a
                  [routerLink]="['delete']"
                  [queryParams]="{
                    id: prescription.id,
                  }"
                  ><strong>Delete</strong></a
                >
              }
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
      id: string;
      cas: string;
      cui: string;
      daysNumber: string;
      diagnostic: string;
      doctor: { name: string; surname: string };
      issued: Date;
      medUnit: string;
      medicationNames: string[];
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
            // this.router.navigate(['/auth/login']);
            window.location.href = '/auth/login';
          } else {
            this.user.set({
              id: response.body.id,
              isDoctor: response.body.isDoctor,
            });
            this.api
              .get<
                {
                  globalID: string;
                  cas: string;
                  cui: string;
                  daysNumber: string;
                  diagnostic: string;
                  doctor: { name: string; surname: string };
                  issued: Date;
                  medUnit: string;
                  medication: { name: string }[];
                  patient: { name: string; surname: string };
                }[]
              >(
                `prescription/${this.user()!.isDoctor ? 'doctor' : 'patient'}/${this.user()!.id}`,
              )
              .subscribe({
                next: (response) => {
                  if (!!response.body) {
                    console.log(response.body);
                    this.prescriptions.set(
                      response.body.map((p) => {
                        return {
                          ...p,
                          id: p.globalID,
                          issued: new Date(p.issued),
                          medicationNames: p.medication.map((m) => m.name),
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
