import { Component } from '@angular/core';

@Component({
  selector: 'app-prescribe',
  imports: [],
  template: `
    <form>
      <h2>Prescription Form</h2>

      <label>
        Patient
        <!-- TODO: Make a search thing -->
        <input required type="text" />
      </label>
      <!-- TODO: Display some basic user details -->
      <br />

      <label>
        Medication
        <!-- TODO: Make a search thing -->
        <input required type="text" />
      </label>
      <!-- TODO: Display some basic medication details -->
      <br />

      <label>
        Duration
        <input required type="text" />
      </label>
      <br />

      <label>
        Must be taken after a meal?
        <input required type="checkbox" />
      </label>
      <br />

      <label>
        Instructions
        <textarea></textarea>
      </label>
      <br />

      <label>
        Additional Notes
        <textarea></textarea>
      </label>
      <br />

      <button type="submit">Submit</button>
    </form>
  `,
  styles: ``,
})
export class PrescribeComponent {}
