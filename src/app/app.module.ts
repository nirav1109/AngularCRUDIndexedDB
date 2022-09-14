import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './components/registration/registration.component';
import { MaterialModule } from './material.module';
import { LoginComponent } from './components/login/login.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { NewpasswordComponent } from './components/newpassword/newpassword.component';
import { AllusersComponent } from './components/allusers/allusers.component';
import { EditrecordsComponent } from './components/editrecords/editrecords.component';
import { DeleteconfirmationComponent } from './components/shared/deleteconfirmation/deleteconfirmation.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthgaurdGuard } from './shared/authgaurd.guard';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmpasswordDirective } from './directive/confirmpassword.directive';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ResetpasswordComponent,
    NewpasswordComponent,
    AllusersComponent,
    EditrecordsComponent,
    DeleteconfirmationComponent,
    HeaderComponent,
    ConfirmpasswordDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [AuthgaurdGuard,CookieService],
  bootstrap: [AppComponent],
  entryComponents: [EditrecordsComponent,DeleteconfirmationComponent]
})
export class AppModule { }
