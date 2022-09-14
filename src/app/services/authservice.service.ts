import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private cookie : CookieService) { }

  loggedIn() {
    return !!this.cookie.get('user');
  }
}
