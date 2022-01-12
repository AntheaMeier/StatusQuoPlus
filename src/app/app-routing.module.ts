import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from "./auth-guard.service";
import {TeamviewComponent} from "./teamview/teamview.component";
import {GoalsCreateComponent} from "./goals/goals-create/goals-create.component";
import {AnnualReviewComponent} from "./annual-review/annual-review.component";

const routes: Routes = [
  {
    path: '',
    component: GoalsCreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'teamview/:id',
    component: TeamviewComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'protokolle',
    component: AnnualReviewComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
