import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { RegistrationService } from 'src/app/services/registration.service';
@Component({
  selector: 'app-editrecords',
  templateUrl: './editrecords.component.html',
  styleUrls: ['./editrecords.component.css']
})
export class EditrecordsComponent implements OnInit {

  id ;
  userData;
  userForm !:FormGroup ;
  constructor(private dialogRef: MatDialogRef<EditrecordsComponent>, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) data, private service:RegistrationService) { 
    this.id = data.id;
  }

  ngOnInit() {
    this.getData();
  }
  getData(){
    this.service.get(this.id).then((res:any)=>{
      this.userData = res;
      this.createForm();
    });
  }

  createForm(){
    console.log(this.userData)
    this.userForm = this.formBuilder.group({
      name: [this.userData.name , [Validators.required, Validators.pattern('^[a-zA-Z]*')]],
      username: [this.userData.username , [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      phone: [this.userData.phone, [Validators.pattern('[789][0-9]{9}')]],
      zipcode:[this.userData.zipcode],
      password:[this.userData.password,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{1,}$')]],
    });
  }

  formSubmit(){
    this.service.edit(this.userForm.value);
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
