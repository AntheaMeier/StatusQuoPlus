import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    // here you can get your observable with loginData as well if you like. use observable as long as you can
    if (this.auth.getUserDetails() != null) {
      // of() is just making an observable that emits the parameters after one another
      return of(true);
    } else {
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}
