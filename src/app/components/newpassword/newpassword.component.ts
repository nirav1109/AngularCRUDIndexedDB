import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {

  userForm:any;
  constructor(private formBuilder:FormBuilder, private service:RegistrationService, private router:ActivatedRoute, private route:Router) { }

  ngOnInit() {
   
    this.createForm();

  }

  createForm(){
    this.userForm = this.formBuilder.group({
      password:['',[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{1,}$')]],
      cpassword:['',[Validators.required]] 
    },
    {
      validators:this.MustMatch('password', 'cpassword')
    });
  }
  updatePassword(){
    if(this.userForm.value.password === this.userForm.value.cpassword){
      this.service.get(this.router.snapshot.paramMap.get('id')).then((res:any)=>{
        if(res){
          res.password = this.userForm.value.password;
          this.service.add(this.router.snapshot.paramMap.get('id'), res).then((res:any)=>{
        this.service.showMessage('Password has been changed !');

            this.route.navigate(['/login']);
          })
        }
      })
    }
}
MustMatch(password , cpassword){
  return(formGroup:FormGroup)=>{
    const control = formGroup.controls[password];
    const matchingcontrol = formGroup.controls[cpassword];
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