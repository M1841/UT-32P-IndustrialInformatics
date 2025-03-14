import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  imports: [],
  template: `
    <form>
      <h2>Patient Registration Form</h2>
      <a href="auth/register/doctor">Are you a doctor?</a> <br />
      <a href="auth/login">Already have an account?</a> <br />

      <label>
        First Name
        <input required type="text" />
      </label>
      <br />

      <label>
        Last Name
        <input required type="text" />
      </label>
      <br />

      <label>
        Email
        <input required type="email" />
      </label>
      <br />

      <label>
        Password
        <input required type="password" />
      </label>
      <br />

      <label>
        Gender
        <select required>
          <option disabled selected value>-</option>
          @for (gender of ['Female', 'Male', 'Other']; track $index) {
            <option value="{{ gender }}">{{ gender }}</option>
          }
        </select>
      </label>
      <br />

      <label>
        Birthday
        <input required type="date" />
      </label>
      <br />

      <label>
        Phone Number (Optional)
        <input type="text" />
      </label>
      <br />

      <label>
        Allergies (Optional)
        <textarea></textarea>
      </label>
      <br />

      <label>
        Intolerances (Optional)
        <textarea></textarea>
      </label>
      <br />

      <label>
        Conditions (Optional)
        <textarea></textarea>
      </label>
      <br />

      <label>
        Blood Type (Optional)
        <select>
          <option selected value>-</option>
          @for (bloodType of ['A', 'B', 'AB', 'O']; track $index) {
            <option value="{{ bloodType }}">{{ bloodType }}</option>
          }
        </select>
      </label>
      <br />

      <button type="submit">Register</button>
    </form>
  `,
  styles: ``,
})
export class RegisterComponent {}
