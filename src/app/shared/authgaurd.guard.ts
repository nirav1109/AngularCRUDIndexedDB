import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../services/authservice.service';
import { RegistrationService } from '../services/registration.service';

@Injectable({
  providedIn: 'root'
})
export class AuthgaurdGuard implements CanActivate{

  constructor(private authservice:AuthserviceService, private router:Router){}
  canActivate(): boolean {
    if (this.authservice.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
