import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { AuthenticationService } from '../../core/services/authentication.service';
import { EmailVerificationComponent } from './email-verification/email-verification.component';


//import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    EmailVerificationComponent,
  ],
  imports: [CommonModule, AuthenticationRoutingModule,HttpClientModule , ReactiveFormsModule, FormsModule ],
  providers: [AuthenticationService],
})
export class AuthModule {}
