import {Component, InjectionToken} from '@angular/core';
import {AuthGuardService} from "./auth-guard.service";






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [

  ]
  ,

})

export class AppComponent {
  title = 'statusquo';
}
