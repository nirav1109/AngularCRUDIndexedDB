import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie-service";
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name : string;
  constructor(private service:CookieService, private router:Router, private dialog:MatDialog, private rservice:RegistrationService) { }

  ngOnInit() {
    this.name =  this.service.get('user');
  }
  logout(){
    this.rservice.openDialog('Are sure want to Logout !')
      .afterClosed()
      .subscribe((res) => {
        if(res)
        {
          this.service.delete("user");
          this.router.navigate(['/login']);
        } else {
          return false;
        }
      });
  }

}
