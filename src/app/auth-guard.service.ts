import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, private router: Router) {
  }

canActivate(): boolean{
  if (this.auth.getUserDetails() != null){
    return true
  } else{
    this.router.navigate(['/login']);
    return false
  }
}
}
