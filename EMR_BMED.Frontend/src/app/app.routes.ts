import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from '@/pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from '@/pages/auth/login/login.component';
import { RegisterComponent } from '@/pages/auth/register/register.component';
import { RegisterDoctorComponent } from '@/pages/auth/register/doctor/register.doctor.component';
import { PrescriptionsComponent } from '@/pages/prescriptions/prescriptions.component';
import { CreatePrescriptionComponent } from '@/pages/prescriptions/create/create-prescription.component';
import { EditPrescriptionComponent } from '@/pages/prescriptions/edit/edit-prescription.component';
import { DeletePrescriptionComponent } from '@/pages/prescriptions/delete/delete-prescription.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },

  // Authentication
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/register/doctor', component: RegisterDoctorComponent },

  // Prescriptions
  { path: 'prescriptions', component: PrescriptionsComponent },
  { path: 'prescriptions/create', component: CreatePrescriptionComponent },
  { path: 'prescriptions/edit', component: EditPrescriptionComponent },
  { path: 'prescriptions/delete', component: DeletePrescriptionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
