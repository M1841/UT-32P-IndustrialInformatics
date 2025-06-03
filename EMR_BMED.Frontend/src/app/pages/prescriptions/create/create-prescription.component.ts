import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '@/services/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-prescribe',
  imports: [ReactiveFormsModule],
  templateUrl: './create-prescription.html',
})
export class CreatePrescriptionComponent {
  readonly page = signal<number>(1);
  readonly medications = signal<any[]>([]);
  readonly patients = signal<any[]>([]);
  readonly isAuthenticated = computed(() => this.api.isAuthenticated());
  readonly prescription = signal<any>({});
  readonly selectedPatient = signal<any>({});
  readonly selectedMeds = signal<any[]>([]);

  form = new FormGroup({
    doctorId: new FormControl(),
    issued: new FormControl(),
    CAS: new FormControl(),
    CUI: new FormControl(),
    daysNumber: new FormControl(),
    diagnostic: new FormControl(),
    medUnit: new FormControl(),
    isApproved: new FormControl(),
    isMF: new FormControl(),
    isAmbulatory: new FormControl(),
    isHospital: new FormControl(),
    isOther: new FormControl(),
    isMFMM: new FormControl(),
    isSalariat: new FormControl(),
    isCoasigurat: new FormControl(),
    isLiberProfesionist: new FormControl(),
    isCopil: new FormControl(),
    isStudent: new FormControl(),
    isGravida: new FormControl(),
    isPensionar: new FormControl(),
    isVeteran: new FormControl(),
    isLowIncome: new FormControl(),
    isRevolutionar: new FormControl(),
    isHandicap: new FormControl(),
    isAjutorSocial: new FormControl(),
    isSomaj: new FormControl(),
    isPersonalContractual: new FormControl(),
    isCardEuropean: new FormControl(),
    isAcorduriInternationale: new FormControl(),
    isOtherCategories: new FormControl(),
  });
  readonly errors = {
    CAS: signal<string>(''),
    CUI: signal<string>(''),
    daysNumber: signal<string>(''),
    diagnostic: signal<string>(''),
    medUnit: signal<string>(''),
  };

  selectPatient(patient: any) {
    this.selectedPatient.set(patient);
    this.page.set(2);
  }
  addMed(med: any) {
    if (!this.selectedMeds().includes(med)) {
      this.selectedMeds.update((meds) => [...meds, med]);
    }
  }
  removeMed(med: any) {
    this.selectedMeds.update((meds) => meds.filter((m) => m.id !== med.id));
  }
  setPage(num: number) {
    this.page.set(num);
  }

  ngOnInit() {
    if (this.api.isAuthenticated()) {
      this.setDoctorId();
      this.route.queryParams
        .pipe(
          map((params) => {
            return {
              medIds: params['medId']?.split(',') ?? [],
              patientId: params['patientId'],
            };
          }),
          tap(({ patientId }) => {
            if (!!patientId) {
              this.api
                .get<{ id: string; name: string }>(`user/${patientId}`)
                .subscribe((res) => {
                  if (res.body) {
                    this.selectedPatient.set(res.body);
                  }
                });
              this.page.set(2);
            }
          }),
          tap(({ medIds }) => {
            if (!!medIds) {
              for (const medId of medIds) {
                this.api
                  .get<{ id: string; name: string }>(`medication/${medId}`)
                  .subscribe((res) => {
                    if (res.body) {
                      this.selectedMeds.update((meds) => [...meds, res.body]);
                    }
                  });
              }
            }
          }),
        )
        .subscribe();
    } else {
      // this.router.navigate(['/auth/login']);
      window.location.href = '/auth/login';
    }
  }

  setDoctorId() {
    this.api.get<{ id: string; isDoctor: boolean }>('auth/whoami').subscribe({
      next: (response) => {
        if (response.body?.id && response.body?.isDoctor) {
          this.form.patchValue({ doctorId: response.body.id });
        } else {
          window.location.href = '/auth/login';
        }
      },
      error: (err) => {
        console.error('Failed to fetch doctor ID:', err);
      },
    });
  }

  readonly patientSearch = new FormGroup({
    query: new FormControl(''),
  });
  loadPatients() {
    const query = this.patientSearch.value.query;
    if (this.patientSearch.valid) {
      this.api
        .get<
          { id: string; name: string; surname: string }[]
        >(`user/search/${query}`)
        .subscribe({
          next: (response) => {
            if (response.body) {
              this.patients.set(response.body);
            } else {
              this.patients.set([]);
            }
          },
          error: (err) => {
            console.error('Failed to fetch patients:', err);
            this.patients.set([]);
          },
        });
    } else {
      this.patients.set([]);
    }
  }

  readonly medicationSearch = new FormGroup({
    query: new FormControl(''),
  });
  loadMedications() {
    const query = this.medicationSearch.value.query;
    if (this.medicationSearch.valid) {
      this.api
        .get<{ id: string; name: string }[]>(`medication/search/${query}`)
        .subscribe({
          next: (response) => {
            if (response.body) {
              this.medications.set(response.body);
            } else {
              this.medications.set([]);
            }
          },
          error: (err) => {
            console.error('Failed to fetch medications:', err);
            this.medications.set([]);
          },
        });
    } else {
      this.medications.set([]);
    }
  }

  handleSubmit() {
    if (
      this.form.valid &&
      !!this.form.value.doctorId?.trim() &&
      !!this.form.value.CAS?.trim() &&
      !!this.form.value.CUI?.trim() &&
      !!this.form.value.daysNumber?.trim() &&
      !!this.form.value.diagnostic?.trim() &&
      !!this.form.value.medUnit?.trim()
    ) {
      this.api
        .post('prescription', {
          ...this.form.value,
          patientId: this.selectedPatient().id,
          medicationIds: this.selectedMeds().map((med) => med.id),
        })
        .subscribe(() => {
          alert('Prescription created successfully!');
          this.form.reset();
          this.router.navigate(['prescriptions']);
        });
    } else {
      this.errors.CAS.set(
        !this.form.value.CAS?.trim() ? 'CAS number cannot be empty' : '',
      );
      this.errors.CUI.set(
        !this.form.value.CUI?.trim() ? 'CUI number cannot be empty' : '',
      );
      this.errors.daysNumber.set(
        !this.form.value.daysNumber?.trim()
          ? 'Days number cannot be empty'
          : '',
      );
      this.errors.diagnostic.set(
        !this.form.value.diagnostic?.trim() ? 'Diagnostic cannot be empty' : '',
      );
      this.errors.medUnit.set(
        !this.form.value.medUnit?.trim()
          ? 'Medication unit cannot be empty'
          : '',
      );
    }
  }

  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
}
