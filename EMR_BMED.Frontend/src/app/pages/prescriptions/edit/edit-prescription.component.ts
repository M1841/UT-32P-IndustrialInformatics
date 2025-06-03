import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '@/services/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-prescribe',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-prescription.html',
})
export class EditPrescriptionComponent {
  readonly id = signal<string>('');
  readonly isAuthenticated = computed(() => this.api.isAuthenticated());
  readonly patient = signal<string>('');
  readonly meds = signal<string[]>([]);

  form = new FormGroup({
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
      this.route.queryParams
        .pipe(
          map((params) => params['id']),
          switchMap((id) => {
            if (!id) {
              this.router.navigate(['prescriptions']);
              return EMPTY;
            } else {
              this.id.set(id);
              return this.api.get<{
                cas: string;
                cui: string;
                daysNumber: number;
                diagnostic: string;
                doctorId: string;
                globalID: string;
                isAcorduriInternationale: boolean;
                isAjutorSocial: boolean;
                isAmbulatory: boolean;
                isApproved: boolean;
                isCardEuropean: boolean;
                isCoasigurat: boolean;
                isCopil: boolean;
                isGravida: boolean;
                isHandicap: boolean;
                isHospital: boolean;
                isLiberProfesionist: boolean;
                isLowIncome: boolean;
                isMF: boolean;
                isMFMM: boolean;
                isOther: boolean;
                isOtherCategories: boolean;
                isPensionar: boolean;
                isPersonalContractual: boolean;
                isRevolutionar: boolean;
                isSalariat: boolean;
                isSomaj: boolean;
                isStudent: boolean;
                isVeteran: boolean;
                medUnit: string;
                medication: { name: string }[];
                numberID: string;
                patientId: string;
                patient: { name: string; surname: string };
              }>(`prescription/${id}`);
            }
          }),
        )
        .subscribe((res) => {
          if (res.body !== null) {
            this.patient.set(
              `${res.body.patient.name} ${res.body.patient.surname}`,
            );
            this.meds.set(res.body.medication.map((med) => med.name));
            this.form.setValue({
              CAS: res.body.cas,
              CUI: res.body.cui,
              daysNumber: res.body.daysNumber,
              diagnostic: res.body.diagnostic,
              medUnit: res.body.medUnit,
              isApproved: res.body.isApproved,
              isMF: res.body.isMF,
              isAmbulatory: res.body.isAmbulatory,
              isHospital: res.body.isHospital,
              isOther: res.body.isOther,
              isMFMM: res.body.isMFMM,
              isSalariat: res.body.isSalariat,
              isCoasigurat: res.body.isCoasigurat,
              isLiberProfesionist: res.body.isLiberProfesionist,
              isCopil: res.body.isCopil,
              isStudent: res.body.isStudent,
              isGravida: res.body.isGravida,
              isPensionar: res.body.isPensionar,
              isVeteran: res.body.isVeteran,
              isLowIncome: res.body.isLowIncome,
              isRevolutionar: res.body.isRevolutionar,
              isHandicap: res.body.isHandicap,
              isAjutorSocial: res.body.isAjutorSocial,
              isSomaj: res.body.isSomaj,
              isPersonalContractual: res.body.isPersonalContractual,
              isCardEuropean: res.body.isCardEuropean,
              isAcorduriInternationale: res.body.isAcorduriInternationale,
              isOtherCategories: res.body.isOtherCategories,
            });
          }
        });
    } else {
      // this.router.navigate(['/auth/login']);
      window.location.href = '/auth/login';
    }
  }

  handleSubmit() {
    if (
      this.form.valid &&
      !!this.form.value.CAS?.trim() &&
      !!this.form.value.CUI?.trim() &&
      !!this.form.value.daysNumber?.trim() &&
      !!this.form.value.diagnostic?.trim() &&
      !!this.form.value.medUnit?.trim()
    ) {
      this.api
        .put(`prescription/${this.id()}`, this.form.value)
        .subscribe(() => {
          alert('Prescription modified successfully!');
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
