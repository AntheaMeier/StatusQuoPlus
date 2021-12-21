import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ResponsiveHeaderComponent} from "./responsive-header/responsive-header.component";
import {AuthGuardService} from "./auth-guard.service";
import {GoalsCreateComponent} from "./goals/goals-create/goals-create.component";

const routes: Routes = [
  {path: '',
    component: ResponsiveHeaderComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
