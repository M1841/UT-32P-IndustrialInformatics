import { Component, computed, inject, signal } from '@angular/core';

import { ApiService } from '@/services/api/api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-prescriptions',
  imports: [RouterLink],
  template: `
    @if (user() != null) {
      <div class="prescription-component">
      <div style="padding-left: 3rem; padding-right: 3rem">
        <h2>Your prescriptions:</h2>
        @if (this.user()!.isDoctor) {
          <a [routerLink]="['create']" class="nav-button">New Prescription</a>
          <br />
        }

        <div class="info-prescription-component">
        <ul>
          @for (prescription of prescriptions(); track $index) {
            <li>
              <strong>CAS:</strong> {{ prescription.cas }}<br />
              <strong>CUI:</strong> {{ prescription.cui }}<br />
              <strong>Days Number:</strong> {{ prescription.daysNumber }}<br />
              <strong>Diagnostic:</strong> {{ prescription.diagnostic }}<br />
              <strong>Doctor:</strong> {{ prescription.doctor.name }}
              {{ prescription.doctor.surname }}<br />
              <strong>Issued:</strong> {{ prescription.issued }}<br />
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
                  class="nav-button"
                >
                  Edit
                </a>
                <button
                  (click)="openDeleteDialog(prescription)"
                  class="logout-btn"
                >
                  Delete
                </button>
              }
            </li>
            <hr />
          }
        </ul>
        </div>
        <dialog>
          <form method="dialog">
            @if (selectedPrescription() !== null) {
              <p>Are you sure you want to delete the selected prescription?</p>
              <strong>Medication:</strong>
              @for (
                medName of selectedPrescription()!.medicationNames;
                track $index
              ) {
                {{ medName }}
                @if (
                  $index + 1 < selectedPrescription()!.medicationNames.length
                ) {
                  ,
                }
              }
              <br />
              <strong>Patient:</strong>
              {{ selectedPrescription()!.patient.name }}
              {{ selectedPrescription()!.patient.surname }}
              <menu style="padding: 0">
                <button class="nav-button">No, cancel</button>
                <button (click)="handleDelete()" class="logout-btn">
                  Yes, delete
                </button>
              </menu>
            }
          </form>
        </dialog>
      </div>
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
      issued: string;
      medUnit: string;
      medicationNames: string[];
      patient: { name: string; surname: string };
    }[]
  >([]);
  readonly isAuthenticated = computed(() => this.api.isAuthenticated());
  readonly selectedPrescription = signal<{
    id: string;
    patient: { name: string; surname: string };
    medicationNames: string[];
  } | null>(null);

  openDeleteDialog(prescription: any) {
    this.selectedPrescription.set(prescription);
    const dialog = document.querySelector('dialog') as HTMLDialogElement;
    dialog.showModal();
  }
  handleDelete() {
    if (this.selectedPrescription() !== null) {
      this.api
        .delete(`prescription/${this.selectedPrescription()!.id}`)
        .subscribe(() => {
          this.loadPrescriptions();
        });
    }
  }

  loadPrescriptions() {
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
                  this.prescriptions.set(
                    response.body.map((p) => {
                      const issued = new Date(p.issued);
                      const issuedString = `${issued.getDate()}/${issued.getMonth()}/${issued.getFullYear()}`;
                      return {
                        ...p,
                        id: p.globalID,
                        issued: issuedString,
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

  ngOnInit() {
    if (this.api.isAuthenticated()) {
      this.loadPrescriptions();
    } else {
      window.location.href = '/auth/login';
    }
  }
  private api = inject(ApiService);
  private router = inject(Router);
}
