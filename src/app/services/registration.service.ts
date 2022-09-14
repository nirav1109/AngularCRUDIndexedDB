import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DeleteconfirmationComponent } from '../components/shared/deleteconfirmation/deleteconfirmation.component';

declare var db: any;
declare let Email: any;
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  public storegename = 'UserRegistrationdb';

  public otpclass = false;
  constructor(private _snackBar: MatSnackBar, private dialog:MatDialog) { 
   }

  add(KeyName, Value) {
    return new Promise(async(resolve, reject) => {
      if (db != undefined) {
        const request = await db.transaction([this.storegename], 'readwrite')
          .objectStore(this.storegename).put(Value, KeyName);

        request.onsuccess = function (event) {
          if (event.target.result) {
            resolve("success")
          } else {
            console.log("error");
            reject(false);
          }
        }
      }else{
        resolve({})
      }
    })

  }

  get(KeyName){
    return new Promise(async(resolve, reject) => {
      if (db != undefined) {
        const request = await db.transaction([this.storegename], 'readwrite')
          .objectStore(this.storegename).get(KeyName);
        request.onsuccess = function (event) {
          if (event.target.result) {
            resolve(event.target.result)
          } else {
        this.service.showMessage('Email not registered !');
          }
        }
      }
    })
  }

  sendOTP(to,otp){
    Email.send({
      Host : "smtp.elasticemail.com",
      Username : "niravdeveloplmenttesting@gmail.com",
      Password : "YOURPASSWORD", //elastic account password 
      To : `${to}`,
      From : "niravdevelopmenttesting@gmail.com",
      Subject : "Reset Password",
      Body : `Hi , There was a request to change your password! If you did not make this request then please ignore this email.Otherwise, please note this OTP to change your password: ${otp}`
  }).then(
    message => this.showMessage('OTP sent to your email. !') ,
    this.otpclass = true
  );
  }

  showMessage(message: string) {
    this._snackBar.open(message, 'close', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

   getAll(){
    return new Promise(async(resolve, reject) => {
      if (db != undefined) {
        const request = await db.transaction([this.storegename], 'readwrite')
          .objectStore(this.storegename).getAll();
        request.onsuccess = function (event) {
          if (event.target.result) {
            resolve(event.target.result)
          } else {
            reject('Something went wrong')
          }
        }
      }
    })
  }

  delete(KeyName){
    return new Promise(async(resolve, reject) => {
      if (db != undefined) {
        const request = await db.transaction([this.storegename], 'readwrite')
          .objectStore(this.storegename).delete(KeyName);
        request.onsuccess = (event)=>{
          console.log(request)
          this.showMessage('Record deleted successfully !')
        }
        request.onerror = (error) =>{
          this.showMessage('Error in request to delete !')
        }
      }
    })
  }

  edit(KeyName){
    return new Promise(async(resolve, reject) => {
      if (db != undefined) {
        const request = await db.transaction([this.storegename], 'readwrite')
          .objectStore(this.storegename).put(KeyName);
        request.onsuccess = function (event) {
            this.getAll();
        };
        request.onerror = function(e)
        {
          console.log(e);
        }
      }
    })
  }

  openDialog(msg:any){
    return this.dialog.open(DeleteconfirmationComponent,{
      disableClose:true,
      data:{message:msg}
    })
  }

}
