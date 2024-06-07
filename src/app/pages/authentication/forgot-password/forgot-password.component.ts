import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { NotificationService } from '../../../core/services/notification.service';
import { AppState } from '../../../store/app.states';
import { Store } from '@ngrx/store';
import { MustMatch } from '../../../core/helpers/form-control-helper';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  hideLoginPassword: boolean = true;
  forgotPasswordFrom: FormGroup;
  state: 'gettoken' | 'token' | 'success' = 'gettoken';
  otp: string = '';
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private notify: NotificationService,
    private store: Store<AppState>
  ) {
    this.forgotPasswordFrom = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirm_password: ['', [Validators.required]],
      },
      {
        validators: MustMatch('password', 'confirm_password'),
      }
    );
  }

  ngOnInit(): void {}

  forgotPassword() {
    if (this.forgotPasswordFrom.invalid) {
      return;
    }
    this.auth
      .forgotPassword({
        email: this.forgotPasswordFrom.get('email')?.value,
      })
      .subscribe((data) => {
        this.state = 'token';
      });
  }

  backToHome() {
    this.router.navigate(['/welcome']);
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  toggleConfirmPassword() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
  toggleLoginPassword() {
    this.hideLoginPassword = !this.hideLoginPassword;
  }

  onOtpChange(event: any) {
    this.otp = event;
  }

  resetPassword() {
    this.auth
      .resetPassword({
        email: this.forgotPasswordFrom.get('email')?.value,
        password: this.forgotPasswordFrom.get('password')?.value,
        token: this.otp,
      })
      .subscribe({
        next: () => {
          this.notify.success('Password reset successfull');
          this.state = 'success';
        },
      });
  }
}
