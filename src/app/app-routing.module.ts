import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllusersComponent } from './components/allusers/allusers.component';
import { LoginComponent } from './components/login/login.component';
import { NewpasswordComponent } from './components/newpassword/newpassword.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { AuthgaurdGuard } from "./shared/authgaurd.guard";

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'signup',component:RegistrationComponent},
  {path:'login',component:LoginComponent},
  {path:'resetpassword',component:ResetpasswordComponent},
  {path:'allusers',component:AllusersComponent, canActivate:[AuthgaurdGuard]},
  {path:'newpassword/:id',component:NewpasswordComponent, canActivate:[AuthgaurdGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
