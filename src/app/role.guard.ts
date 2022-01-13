import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {


  constructor(public auth: AuthService, private router: Router) {
  }


  canActivate(): boolean {
    if (this.auth.getUserDetails().user_info.role == "Vorgesetzte_r") {
      return true
    } else {
      this.router.navigate(['/notfound']);
      return false
    }
  }


}
