import { Component, computed, inject, signal } from '@angular/core';

import { ApiService } from '@/services/api/api.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-medication',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './medication.html',
//   template: `
//     @if (isLoading()) {
//   <div class="loading-state">
//     loading...
//   </div>
// } @else {
//   <div class="med-search-container">
//     <main>
//       <!-- Search Form -->
//       <form class="search-form" [formGroup]="searchForm" (input)="handleSearch()">
//         <input
//           required
//           placeholder="Search"
//           formControlName="query"
//         />
//       </form>

//       <!-- Top Pagination Controls -->
//       <div class="pagination-controls">
//         <button (click)="setPage(1)" [disabled]="page() === 1">
//           &lt;&lt;
//         </button>
//         <button (click)="setPage(page() - 1)" [disabled]="page() === 1">
//           &lt;
//         </button>
//         <span>Page {{ page() }}</span>
//         <button (click)="setPage(page() + 1)" [disabled]="page() === lastPage()">
//           &gt;
//         </button>
//         <button (click)="setPage(lastPage())" [disabled]="page() === lastPage()">
//           &gt;&gt;
//         </button>
//       </div>

//       <!-- Medication List -->
//       <ul class="med-list">
//         @for (med of displayedMeds(); track $index) {
//           <li (click)="selectMed(med)">
//             <strong>Name:</strong> {{ med.name }}<br />
//             <strong>Brand:</strong> {{ med.brand }}<br />
//           </li>
//         }
//       </ul>

//       <!-- Bottom Pagination Controls -->
//       <div class="pagination-controls">
//         <button (click)="setPage(1)" [disabled]="page() === 1">
//           &lt;&lt;
//         </button>
//         <button (click)="setPage(page() - 1)" [disabled]="page() === 1">
//           &lt;
//         </button>
//         <span>Page {{ page() }}</span>
//         <button (click)="setPage(page() + 1)" [disabled]="page() === lastPage()">
//           &gt;
//         </button>
//         <button (click)="setPage(lastPage())" [disabled]="page() === lastPage()">
//           &gt;&gt;
//         </button>
//       </div>
//     </main>

//     <aside class="med-details">
//       @if (displayedMed() !== null) {
//         <h2>{{ displayedMed().name }} – {{ displayedMed().brand }}</h2>
//         <p><strong>Dosage Form:</strong> {{ displayedMed().form }}</p>
//         <p><strong>Administration Method:</strong> {{ displayedMed().method }}</p>
//         <p>
//           <strong>Requires Prescription:</strong>
//           {{ displayedMed().isPresRequired ? 'Yes' : 'No' }}
//         </p>
//         <p><strong>Indications:</strong> {{ displayedMed().indications }}</p>
//         <p><strong>Contraindications:</strong> {{ displayedMed().contraindications }}</p>
//         <p><strong>Side Effects:</strong> {{ displayedMed().sideEffects }}</p>
//         <p><strong>Warnings:</strong> {{ displayedMed().warnings }}</p>
//         <p><strong>Storing:</strong> {{ displayedMed().storing }}</p>
//         @if (isDoctor()) {
//           <a
//             [routerLink]="['../prescriptions/create']"
//             [queryParams]="{ medId: displayedMed().id }"
//             class="nav-button"
//           >
//             Add to a prescription
//           </a>
//         }
//       }
//     </aside>
//   </div>
//     }
//   `,
//   styles: ``,
})
export class MedicationComponent {
  readonly isLoading = signal<boolean>(true);
  readonly medication = signal<any[]>([]);
  readonly displayedMed = signal<any>(null);
  readonly isDoctor = signal<boolean>(false);

  readonly page = signal<number>(1);
  readonly lastPage = computed(() =>
    Math.ceil(this.filteredMeds().length / 10),
  );
  readonly displayedMeds = computed(() =>
    this.filteredMeds().slice((this.page() - 1) * 10, this.page() * 10),
  );
  setPage(num: number) {
    if (num >= 1 && num <= this.lastPage()) {
      this.page.set(num);
    }
  }

  readonly query = signal<string>('');
  readonly searchForm = new FormGroup({
    query: new FormControl(''),
  });
  handleSearch() {
    this.query.set(this.searchForm.value.query ?? '');
    this.setPage(1);
  }
  selectMed(med: any) {
    this.displayedMed.set(med);
  }
  readonly filteredMeds = computed(() =>
    this.medication().filter(
      (m) =>
        m.name.toLowerCase().includes(this.query().toLowerCase()) ||
        m.brand.toLowerCase().includes(this.query().toLowerCase()),
    ),
  );

  ngOnInit() {
    if (this.api.isAuthenticated()) {
      this.api.get<any[]>(`medication/all`).subscribe((res) => {
        if (res.body !== null) {
          this.medication.set(res.body);
          this.isLoading.set(false);
        }
      });
      this.api.get<{ isDoctor: boolean }>('auth/whoami').subscribe((res) => {
        this.isDoctor.set(res.body?.isDoctor ?? false);
      });
    } else {
      window.location.href = '/auth/login';
    }
  }

  private api = inject(ApiService);
}
