import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from '@/pages/home/home.component';
import { LoginComponent } from '@/pages/auth/login/login.component';
import { RegisterComponent } from '@/pages/auth/register/register.component';
import { RegisterDoctorComponent } from '@/pages/auth/register/doctor/register.doctor.component';
import { PrescribeComponent } from '@/pages/prescribe/prescribe.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/register/doctor', component: RegisterDoctorComponent },
  { path: 'prescribe', component: PrescribeComponent },

  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
