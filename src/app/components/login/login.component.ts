import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RegistrationService } from 'src/app/services/registration.service';
import { MatIconModule } from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm : any;
  constructor(private formBuilder : FormBuilder, public service:RegistrationService, private router:Router, private cookie: CookieService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password:['',[Validators.required]],
    });
  }

  formSubmit(){
    this.service.get(this.userForm.value.email).then((res:any)=>{
      if(res){
        if(res.password === this.userForm.value.password){
        this.service.showMessage('Login Success...!');
        this.router.navigate(['/allusers']);
        this.cookie.set('user', this.userForm.value.email);
        } else{
        this.service.showMessage('Password does not match !');
        }
      } 
    })
  }

  

}
