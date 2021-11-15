import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginZweiComponent} from "./login-zwei/login-zwei.component";

const routes: Routes = [
  {path: '', component: LoginZweiComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
