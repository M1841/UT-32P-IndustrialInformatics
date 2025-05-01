import { Routes } from '@angular/router';

import { HomeComponent } from '@/pages/home/home.component';
import { LoginComponent } from '@/pages/auth/login/login.component';
import { RegisterComponent } from '@/pages/auth/register/register.component';
import { RegisterDoctorComponent } from '@/pages/auth/register/doctor/register.doctor.component';
import { PrescribeComponent } from '@/pages/prescribe/prescribe.component';
import { TestComponent } from '@/pages/test/test.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/register/doctor', component: RegisterDoctorComponent },
  { path: 'prescribe', component: PrescribeComponent },
  { path: 'test', component: TestComponent },
  { path: 'profile', component: ProfileComponent },
];
