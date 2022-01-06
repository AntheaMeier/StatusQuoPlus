import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ResponsiveHeaderComponent} from "./responsive-header/responsive-header.component";
import {AuthGuardService} from "./auth-guard.service";
import {GoalsCreateComponent} from "./goals/goals-create/goals-create.component";
import {TodoComponent} from "./todo/todo.component";
import {AnnualReviewComponent} from "./annual-review/annual-review.component";

const routes: Routes = [


  {
    path: 'ziele',
    component: GoalsCreateComponent,

  },

  {
    path: 'protokolle',
    component: AnnualReviewComponent,

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
