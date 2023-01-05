import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from "./services/auth-guard.service";
import {GoalsCreateComponent} from "./components/goals/goals-create/goals-create.component";
import {AnnualReviewComponent} from "./components/annual-review/annual-review.component";
import {RoleGuard} from "./guards/role.guard";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {TeamviewComponent} from "./components/teamview/teamview.component";
import {LoginComponent} from "./components/login/login.component";
import { OverviewComponent } from './components/overview/overview.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { FeedbackCreateComponent } from './components/feedback/feedback-create/feedback-create.component';
import { MoodComponent } from './components/mood/mood.component';
import {MoodTrackerStatistikComponent} from "./components/mood/mood-tracker-statistik/mood-tracker-statistik.component";

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
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
    path: 'feedback',
    component: FeedbackComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'mood',
    component: MoodComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'mood-team',
    component: MoodTrackerStatistikComponent,
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
