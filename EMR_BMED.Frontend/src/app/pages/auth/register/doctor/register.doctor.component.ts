import { Component } from '@angular/core';

@Component({
  selector: 'app-register.doctor',
  imports: [],
  template: `
    <h2>Doctor Registration Form</h2>
    <a href="auth/register">Are you a patient?</a> <br />
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
      Address (Optional)
      <input type="text" />
    </label>
    <br />

    <label>
      Medical Field (Optional)
      <input type="text" />
    </label>
    <br />

    <button type="submit">Register</button>
  `,
  styles: ``,
})
export class RegisterDoctorComponent {}
