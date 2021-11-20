import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ResponsiveHeaderComponent} from "./responsive-header/responsive-header.component";
import {AuthGuardService} from "./auth-guard.service";

const routes: Routes = [
  {path: '',
    component: ResponsiveHeaderComponent,
    canActivate: [AuthGuardService]
  },
  {path: 'login', component: LoginComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
