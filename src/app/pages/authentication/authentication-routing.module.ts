import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
//import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  { 
    path: 'email-verification', 
    component: EmailVerificationComponent 
  },
  
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AuthenticationRoutingModule {}
