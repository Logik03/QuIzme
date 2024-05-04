import { Component, Inject, OnInit,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
//import { MustMatch } from '../../../core/helpers/form-control-helper';
//import { NotificationService } from '../../../core/services/notification.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  signInForm: FormGroup;
  signUpForm: FormGroup;
  public currentTab : string = 'register';
  public registerTabActive: boolean = false;
  public activeTab: string = 'register';
  constructor(
    private router : Router,
    private fb : FormBuilder,
    private auth : AuthenticationService,
    //private notify : NotificationService,
    private route: ActivatedRoute
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
        email: ['', [Validators.required]],
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirm_password: ['', [Validators.required]],
      },
      {
        //validators: MustMatch('password', 'confirm_password'),
    })
  }

  ngOnInit(): void {
  }

  register() {
    this.router.navigate(['/auth/register']);
  }

  onSignIn() {
    this.auth.login(this.signInForm.value).subscribe((res: any)=> {
      console.log(res.data, 'i am response from loging in!!')
      if(res.data.status) {
        this.router.navigateByUrl('/app/dashboard/convert', { replaceUrl: true });
      }
    })
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
    this.auth.signUp(this.signUpForm.value).subscribe((res:any) => {
      console.log(res, 'i am signup response')
      if(res.data.status == true) {
        this.signUpForm.reset();
        this.switchToTab('login');
        //this.notify.success(res.data.Msg);
      }else {
        //this.notify.error('something went wrong');
      }
    })
  }

}

