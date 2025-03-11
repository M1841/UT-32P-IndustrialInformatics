import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="handleLogin()">
      <label>
        Username
        <input type="text" formControlName="username" />
      </label>

      <label>
        Password
        <input type="password" formControlName="password" />
      </label>

      <button type="submit">Login</button>
    </form>
  `,
  styles: ``,
})
export class LoginComponent {
  readonly loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  handleLogin() {
    this.http
      .post<string>('http://localhost:8080/auth/login', this.loginForm.value, {
        observe: 'response',
      })
      .subscribe((response) => {
        console.log(response.body);
      });
  }

  private http = inject(HttpClient);
  private cookies = inject(CookieService);
}
