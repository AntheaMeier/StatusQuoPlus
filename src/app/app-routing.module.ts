import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {LoginZweiComponent} from "./login-zwei/login-zwei.component";
import {ResponsiveHeaderComponent} from "./responsive-header/responsive-header.component";
import {AuthGuardService} from "./auth-guard.service";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: LoginZweiComponent},
  {
    path: '', component: ResponsiveHeaderComponent, canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
