import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '@/services/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-prescribe',
  imports: [ReactiveFormsModule],
  template: `
    <div class="register-container">
      <a href="/" class="home-icon">
        <img src="Logo.png" alt="Home" width="64" height="64" />
      </a>

      <h1>Prescription Form</h1>
      <div style="width:100%; display: flex">
        <form [formGroup]="form" (ngSubmit)="handleSubmit()" style="width: 66%">
          <input required type="hidden" formControlName="doctorId" />
          @if (page() === 1) {
            <section>
              <h1>Patient</h1>
              <form [formGroup]="patientSearch" (input)="loadPatients()">
                <input required placeholder="Search" formControlName="query" />
              </form>
              <ul>
                @for (patient of patients(); track $index) {
                  <li>
                    <p>
                      <strong>Full Name:</strong> {{ patient.name }}
                      {{ patient.surname }}
                    </p>
                    <p><strong>Email:</strong> {{ patient.email }}</p>
                    <p>
                      <strong>Social Number:</strong> {{ patient.socialNumber }}
                    </p>
                    <button
                      type="button"
                      class="nav-button"
                      (click)="selectPatient(patient)"
                    >
                      Select
                    </button>
                    <hr />
                  </li>
                }
              </ul>
            </section>
          }
          @if (page() === 2) {
            <section>
              <h1>Medication</h1>
              <button
                type="button"
                (click)="setPage(3)"
                class="nav-button"
                [disabled]="selectedMeds().length <= 0"
              >
                Continue
              </button>
              <form [formGroup]="medicationSearch" (input)="loadMedications()">
                <input required placeholder="Search" formControlName="query" />
              </form>
              <ul></ul>
              <ul>
                @for (med of medications(); track $index) {
                  <li>
                    <p><strong>Name:</strong> {{ med.name }}</p>
                    <p><strong>Brand:</strong> {{ med.brand }}</p>
                    <p><strong>Dosage Form:</strong> {{ med.form }}</p>
                    <p><strong>Storing:</strong> {{ med.storing }}</p>
                    <button
                      type="button"
                      class="nav-button"
                      (click)="addMed(med)"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      class="logout-btn"
                      (click)="removeMed(med)"
                    >
                      Remove
                    </button>
                    <hr />
                  </li>
                }
              </ul>
            </section>
          }
          @if (page() === 3) {
            <div class="form-group">
              <label for="CAS">CAS Number</label>
              <div class="input-wrapper">
                <input type="text" formControlName="CAS" required />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="CUI">CUI Number</label>
              <div class="input-wrapper">
                <input type="text" formControlName="CUI" required />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="daysNumber">Number of Days</label>
              <div class="input-wrapper">
                <input type="number" formControlName="daysNumber" required />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="diagnostic">Diagnostic</label>
              <div class="input-wrapper">
                <input type="text" formControlName="diagnostic" required />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="medUnit">Medication Unit</label>
              <div class="input-wrapper">
                <input type="text" formControlName="medUnit" required />
              </div>
            </div>
            <div class="form-group">
              <label for="isApproved">Is Approved</label>
              <div class="input-wrapper">
                <input type="checkbox" formControlName="isApproved" />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="isMF">Is MF</label>
              <div class="input-wrapper">
                <input type="checkbox" formControlName="isMF" />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="isAmbulatory">Is Ambulatory</label>
              <div class="input-wrapper">
                <input type="checkbox" formControlName="isAmbulatory" />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="isHospital">Is Hospital</label>
              <div class="input-wrapper">
                <input type="checkbox" formControlName="isHospital" />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="isOther">Is Other</label>
              <div class="input-wrapper">
                <input type="checkbox" formControlName="isOther" />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="isMFMM">Is MFMM</label>
              <div class="input-wrapper">
                <input type="checkbox" formControlName="isMFMM" />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="isSalariat">Is Salariat</label>
              <div class="input-wrapper">
                <input type="checkbox" formControlName="isSalariat" />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="isCoasigurat">Is Coasigurat</label>
              <div class="input-wrapper">
                <input type="checkbox" formControlName="isCoasigurat" />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="isLiberProfesionist">Is Liber Profesionist</label>
              <div class="input-wrapper">
                <input type="checkbox" formControlName="isLiberProfesionist" />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="isCopil">Is Copil</label>
              <div class="input-wrapper">
                <input type="checkbox" formControlName="isCopil" />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="isStudent">Is Student</label>
              <div class="input-wrapper">
                <input type="checkbox" formControlName="isStudent" />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="isGravida">Is Gravida</label>
              <div class="input-wrapper">
                <input type="checkbox" formControlName="isGravida" />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="isPensionar">Is Pensionar</label>
              <div class="input-wrapper">
                <input type="checkbox" formControlName="isPensionar" />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="isVeteran">Is Veteran</label>
              <div class="input-wrapper">
                <input type="checkbox" formControlName="isVeteran" />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="isLowIncome">Is Low Income</label>
              <div class="input-wrapper">
                <input type="checkbox" formControlName="isLowIncome" />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="isRevolutionar">Is Revolutionar</label>
              <div class="input-wrapper">
                <input type="checkbox" formControlName="isRevolutionar" />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="isHandicap">Is Handicap</label>
              <div class="input-wrapper">
                <input type="checkbox" formControlName="isHandicap" />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="isAjutorSocial">Is Ajutor Social</label>
              <div class="input-wrapper">
                <input type="checkbox" formControlName="isAjutorSocial" />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="isSomaj">Is Somaj</label>
              <div class="input-wrapper">
                <input type="checkbox" formControlName="isSomaj" />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="isPersonalContractual">Is Personal Contractual</label>
              <div class="input-wrapper">
                <input
                  type="checkbox"
                  formControlName="isPersonalContractual"
                />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="isCardEuropean">Is Card European</label>
              <div class="input-wrapper">
                <input type="checkbox" formControlName="isCardEuropean" />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="isAcorduriInternationale"
                >Is Acorduri Internationale</label
              >
              <div class="input-wrapper">
                <input
                  type="checkbox"
                  formControlName="isAcorduriInternationale"
                />
              </div>
            </div>
            <br />

            <div class="form-group">
              <label for="isOtherCategories">Is Other Categories</label>
              <div class="input-wrapper">
                <input type="text" formControlName="isOtherCategories" />
              </div>
            </div>
            <br />

            <button type="submit" [disabled]="form.invalid" class="nav-button">
              Submit
            </button>
          }
        </form>
        <aside style="width: 33%">
          <p>
            <strong>Patient:</strong> {{ selectedPatient().name }}
            {{ selectedPatient().surname }}
          </p>
          <div>
            <strong>Medication:</strong>
            <ul>
              @for (med of selectedMeds(); track $index) {
                <li>{{ med.name }} - {{ med.brand }}</li>
              }
            </ul>
          </div>
        </aside>
      </div>
    </div>
  `,
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
    if (this.form.valid) {
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
        !this.form.value.CAS ? 'CAS number cannot be empty' : '',
      );
      this.errors.CUI.set(
        !this.form.value.CUI ? 'CUI number cannot be empty' : '',
      );
      this.errors.daysNumber.set(
        !this.form.value.daysNumber ? 'Days number cannot be empty' : '',
      );
      this.errors.diagnostic.set(
        !this.form.value.diagnostic ? 'Diagnostic cannot be empty' : '',
      );
      this.errors.medUnit.set(
        !this.form.value.medUnit ? 'Medication unit cannot be empty' : '',
      );
    }
  }

  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
}
