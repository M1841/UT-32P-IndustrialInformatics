import { Component, computed, inject, signal } from '@angular/core';

import { ApiService } from '@/services/api/api.service';

@Component({
  selector: 'app-medication',
  imports: [],
  template: `
    @if (isLoading()) {
      loading...
    } @else {
      <div>
        <button (click)="setPage(1)" [disabled]="page() === 1">&lt;&lt;</button>
        <button (click)="setPage(page() - 1)" [disabled]="page() === 1">
          &lt;
        </button>
        <span>Page {{ page() }}</span>
        <button
          (click)="setPage(page() + 1)"
          [disabled]="page() === lastPage()"
        >
          &gt;
        </button>
        <button
          (click)="setPage(lastPage())"
          [disabled]="page() === lastPage()"
        >
          &gt;&gt;
        </button>
      </div>
      <ul>
        @for (med of displayedMeds(); track $index) {
          <li>
            <strong>Name:</strong> {{ med.name }} <br />
            <strong>Brand:</strong> {{ med.brand }} <br />
            <strong>Form:</strong> {{ med.form }} <br />

            <strong>Requires Prescription:</strong>
            {{ med.isPresRequired ? 'Yes' : 'No' }}
            <br />

            <strong>Storing:</strong> {{ med.storing }} <br />
            <hr />
          </li>
        }
      </ul>
      <div>
        <button (click)="setPage(1)" [disabled]="page() === 1">&lt;&lt;</button>
        <button (click)="setPage(page() - 1)" [disabled]="page() === 1">
          &lt;
        </button>
        <span>Page {{ page() }}</span>
        <button
          (click)="setPage(page() + 1)"
          [disabled]="page() === lastPage()"
        >
          &gt;
        </button>
        <button
          (click)="setPage(lastPage())"
          [disabled]="page() === lastPage()"
        >
          &gt;&gt;
        </button>
      </div>
    }
  `,
  styles: ``,
})
export class MedicationComponent {
  readonly isLoading = signal<boolean>(true);
  readonly medication = signal<any[]>([]);
  readonly page = signal<number>(1);
  readonly displayedMeds = computed(() => {
    return this.medication().slice((this.page() - 1) * 10, this.page() * 10);
  });
  readonly lastPage = computed(() => Math.ceil(this.medication().length / 10));

  setPage(num: number) {
    if (num >= 1 && num <= this.lastPage()) {
      this.page.set(num);
    }
  }

  ngOnInit() {
    this.api.get<any[]>(`medication/all`).subscribe((res) => {
      if (res.body !== null) {
        this.medication.set(res.body);
        this.isLoading.set(false);
      }
    });
  }

  private api = inject(ApiService);
}
