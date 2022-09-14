import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/app/services/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
})
export class ResetpasswordComponent implements OnInit {

  email:any;
  receviedOTP:any;
  otpSent=false;
  constructor(private service:RegistrationService, private route:Router) { }

  ngOnInit() {
    this.otpSent = this.service.otpclass;
  }
  formSubmit(){
    this.service.get(this.email).then((res:any)=>{
      if(res){
        res.otp =  Math.floor(1000 + Math.random() * 9000);
        this.service.add(res.email,res);
        this.service.sendOTP(this.email, res.otp);
        this.otpSent = true;
      }else{
        this.service.showMessage('Email not registered !');

        this.otpSent =false;
      }
    })
  }

  verifyOTP(){
    this.service.get(this.email).then((res:any)=>{
      if(this.receviedOTP == res.otp)
      {
        this.route.navigate(['newpassword', this.email]);
      } else {
        this.service.showMessage('Wrong OTP entered !');

      }
    })
  }
}
