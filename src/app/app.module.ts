import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecuperationCompteComponent } from './recuperation-compte/recuperation-compte.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { IsLoadingComponent } from './helpers/is-loading/is-loading.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from './helpers/sidenav/sidenav.component';
import { RapportComponent } from './dashboard/rapport/rapport.component';
import { ProfileComponent } from './helpers/profile/profile.component';
import { ManageComponent } from './dashboard/rapport/manage/manage.component';


@NgModule({
  declarations: [
    AppComponent,
    RecuperationCompteComponent,
    LoginComponent,
    IsLoadingComponent,
    DashboardComponent,
    SidenavComponent,
    RapportComponent,
    ProfileComponent,
    ManageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
