import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';
import * as uuid from 'uuid'
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userForm : any;
  constructor(private formBuilder : FormBuilder, public service:RegistrationService, private router:Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.userForm = this.formBuilder.group({
      uid:[],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*')]],
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      phone: ['', [Validators.pattern('[789][0-9]{9}')]],
      email: ['', [Validators.required, Validators.email]],
      //zipcode:['',[Validators.pattern('^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$')]],
      zipcode:[''],
      password:['',[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{1,}$')]],
      confirmpassword:['',[Validators.required]],
      pan:['',[Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
      otp:[],
    },
    {
      validators:this.MustMatch('password', 'confirmpassword')
    });
  }

  formSubmit(){
    this.userForm.value.uid = uuid.v4();
    this.service.add(this.userForm.value.email, this.userForm.value).then(res=>{
      if(res){
        this.service.showMessage('Registration Done !');
        this.router.navigate(['/login']);
      }
    })
  }

  MustMatch(password , confirmpassword){
    return(formGroup:FormGroup)=>{
      const control = formGroup.controls[password];
      const matchingcontrol = formGroup.controls[confirmpassword];
      if(matchingcontrol.errors && !matchingcontrol.errors.MustMatch){
        return 
      } 
      if(control.value != matchingcontrol.value){
        matchingcontrol.setErrors({MustMatch:true});
      }
      else{
        matchingcontrol.setErrors(null);
      }
    }
  }

}
