import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ResponsiveHeaderComponent} from "./responsive-header/responsive-header.component";
import {AuthGuardService} from "./auth-guard.service";

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
