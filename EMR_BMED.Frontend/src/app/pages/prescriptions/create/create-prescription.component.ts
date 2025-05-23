import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '@/services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prescribe',
  imports: [ReactiveFormsModule],
  template: `
    <div class="register-container">
      <a href="/" class="home-icon">
        <img src="Logo.png" alt="Home" width="64" height="64" />
      </a>

      <form [formGroup]="form" (ngSubmit)="handleSubmit()">
        <h2><b>Prescription Form</b></h2>

        <input type="hidden" formControlName="doctorId" />

        <div class="form-group">
          <label for="patientId">Patient</label>
          <div class="input-wrapper">
            <form [formGroup]="patientSearch" (input)="loadPatients()">
              <input required placeholder="Search" formControlName="query" />
            </form>
            <select formControlName="patientId" required>
              @for (patient of patients(); track $index) {
                <option [value]="patient.id">
                  {{ patient.name }} {{ patient.surname }}
                </option>
              }
            </select>
          </div>
        </div>
        <br />

        <div class="form-group">
          <label for="medicationId">Medication</label>
          <div class="input-wrapper">
            <form [formGroup]="medicationSearch" (input)="loadMedications()">
              <input required placeholder="Search" formControlName="query" />
            </form>
            <select formControlName="medicationId" required>
              @for (medication of medications(); track $index) {
                <option [value]="medication.id">
                  {{ medication.name }}
                </option>
              }
            </select>
          </div>
        </div>
        <br />

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
        <br />

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
            <input type="checkbox" formControlName="isPersonalContractual" />
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
            <input type="checkbox" formControlName="isAcorduriInternationale" />
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

        <button type="submit" [disabled]="form.invalid">Submit</button>
      </form>
    </div>
  `,
})
export class CreatePrescriptionComponent {
  readonly medications = signal<{ id: string; name: string }[]>([]);
  readonly patients = signal<{ id: string; name: string; surname: string }[]>(
    [],
  );
  readonly isAuthenticated = computed(() => this.api.isAuthenticated());

  form = new FormGroup({
    patientId: new FormControl(),
    doctorId: new FormControl(),
    medicationId: new FormControl(),
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

  ngOnInit() {
    if (this.api.isAuthenticated()) {
      this.setDoctorId();
    } else {
      // this.router.navigate(['/auth/login']);
      window.location.href = '/auth/login';
    }
  }

  setDoctorId() {
    this.api.get<{ id: string }>('auth/whoami').subscribe({
      next: (response) => {
        if (response.body?.id) {
          this.form.patchValue({ doctorId: response.body.id });
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
        .post<
          {
            error?: {
              CAS?: string;
              CUI?: string;
              daysNumber?: string;
              diagnostic?: string;
              medUnit?: string;
            };
          },
          typeof this.form.value
        >('prescription', this.form.value)
        .subscribe({
          next: () => {
            alert('Prescription created successfully!');
            this.form.reset();
          },
          error: ({ error }) => {
            this.errors.CAS.set(error?.CAS ?? '');
            this.errors.CUI.set(error?.CUI ?? '');
            this.errors.daysNumber.set(error?.daysNumber ?? '');
            this.errors.diagnostic.set(error?.diagnostic ?? '');
            this.errors.medUnit.set(error?.medUnit ?? '');
          },
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
  private router = inject(Router);
}
