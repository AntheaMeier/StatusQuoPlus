import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from "./services/auth-guard.service";
import {GoalsCreateComponent} from "./components/goals/goals-create/goals-create.component";
import {AnnualReviewComponent} from "./components/annual-review/annual-review.component";
import {RoleGuard} from "./guards/role.guard";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {TeamviewComponent} from "./components/teamview/teamview.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {
    path: '',
    component: GoalsCreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'notfound',
    component: NotFoundComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'teamview/:id',
    component: TeamviewComponent,
    canActivate: [AuthGuardService, RoleGuard]
  },
  {
    path: 'protokolle',
    component: AnnualReviewComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    component: NotFoundComponent,
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
