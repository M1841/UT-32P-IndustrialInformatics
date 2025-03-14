import { Routes } from '@angular/router';

import { HomeComponent } from '@/pages/home/home.component';
import { LoginComponent } from '@/pages/auth/login/login.component';
import { RegisterComponent } from '@/pages/auth/register/register.component';
import { RegisterDoctorComponent } from '@/pages/auth/register/doctor/register.doctor.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/register/doctor', component: RegisterDoctorComponent },
];
