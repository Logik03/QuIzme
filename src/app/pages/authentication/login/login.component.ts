import { Component, Inject, OnInit,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { MustMatch } from '../../../core/helpers/form-control-helper';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAuthenticated, selectUser, selectErrorMessage } from '../../../store/selectors/auth.selectors';
import { login, signup } from '../../../store/actions/auth.actions';
import { AppState } from '../../../store/app.states';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  hideLoginPassword: boolean = true;
  signInForm: FormGroup;
  signUpForm: FormGroup;
  public currentTab : string = 'register';
  public registerTabActive: boolean = false;
  public activeTab: string = 'register';
  constructor(
    private router : Router,
    private fb : FormBuilder,
    private auth : AuthenticationService,
    private notify : NotificationService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.route.queryParams.subscribe(params => {
    if (params['tab'] === 'register') {
      this.switchToTab('register');
    }
    }); 
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
    this.signUpForm = this.fb.group(
      {
        fullName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        terms: [false, [Validators.requiredTrue]], 
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirm_password: ['', [Validators.required]],
      },
      {
        validators: MustMatch('password', 'confirm_password'),
    })
  }

  ngOnInit(): void {
  }

  register() {
    this.router.navigate(['/auth/register']);
  }

  onSignIn() {
    
    if (this.signInForm.invalid) {
      return;
    } 
     const { email, password } = this.signInForm.value;
    this.store.dispatch(login({ payload: { email, password } }));
  }

  backToHome() {
    this.router.navigate(['/welcome'])
  }

  switchToTab( tab: string) {
    this.currentTab = tab;
    this.registerTabActive = !this.registerTabActive;
    this.activeTab = tab;
  }

  onSignUp() {

    if (this.signUpForm.invalid) {
      return;
    } 
     const { email, password, username, fullName } = this.signUpForm.value;
     this.store.dispatch(signup({ payload: { email, password, fullName, username } }));
  }
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  toggleConfirmPassword() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
  toggleLoginPassword() {
    this.hideLoginPassword = !this.hideLoginPassword
  }

}


