import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(public auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log('AUTH GUARD: ', this.auth.getUserDetails());
    if (this.auth.getUserDetails().role == 'Vorgesetzte_r') {
      return true;
    } else {
      this.router.navigate(['/notfound']);
      return false;
    }
  }
}
