import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RapportComponent } from './dashboard/rapport/rapport.component';
import { RecuperationCompteComponent } from './recuperation-compte/recuperation-compte.component';
import { ManageComponent } from './dashboard/rapport/manage/manage.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // default
  { path: 'recuperation-compte', component: RecuperationCompteComponent },
  { path: 'dashboard/:email', component: DashboardComponent },
  { path: 'dashboard/:email/rapport', component: RapportComponent },
  { path: 'dashboard/:email/rapport/manage', component: ManageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
