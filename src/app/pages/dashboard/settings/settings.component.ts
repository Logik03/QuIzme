import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../core/services/game.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IUserData } from '../../../core/models/user';
import { AppState } from '../../../store/app.states';
import { Store, select } from '@ngrx/store';
import { selectUser } from '../../../store/selectors/auth.selectors';
import { NotificationService } from '../../../core/services/notification.service';
import { MustMatch } from '../../../core/helpers/form-control-helper';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { updateUserData } from '../../../store/actions/auth.actions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  countries = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kosovo',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Korea',
    'North Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Korea',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Timor-Leste',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States of America',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe',
  ];
  gender: 'male' | 'female' = 'male';
  tab: 'profile' | 'password' | 'payment' = 'profile';
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  hideLoginPassword: boolean = true;
  forgotPasswordFrom: FormGroup;
  state: 'token' | 'success' | 'set-password' = 'set-password';
  otp: string = '';
  form: FormGroup;
  userData: IUserData = {};
  constructor(
    private _gs: GameService,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private notify: NotificationService,
    private auth: AuthenticationService
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

    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      country: [''],
      state: [''],
      zipCode: [''],
      address: [''],
      gender: [''],
    });
    store.pipe(select(selectUser)).subscribe({
      next: (user) => {
        this.userData = user || {};
        if (user) {
          const clonedUser = { ...user };
          clonedUser.avatar =
            user['avatar'] || '../../../../assets/imgs/avatar-setting.svg';
          this.userData = clonedUser;
        }
        this.forgotPasswordFrom.patchValue({
          email: user?.email,
        });
        this.form.patchValue({
          fullName: user?.fullName,
          email: user?.email,
          phoneNumber: user?.phoneNumber,
          country: user?.country,
          state: user?.state,
          zipCode: user?.zipCode,
          address: user?.address,
          gender: user?.gender,
        });
        this.gender = user?.gender as any;
        this.forgotPasswordFrom.patchValue({
          email: user?.email,
        });
      },
    });
  }

  onOtpChange(event: any) {
    this.otp = event;
  }
  updateProfile() {
    if (this.form.valid) {
      this.store.dispatch(updateUserData({ payload: this.form.value as any }));
    }
  }
  forgotPassword() {
    this.auth
      .forgotPassword({
        email: this.forgotPasswordFrom.get('email')?.value,
      })
      .subscribe((data) => {
        this.state = 'token';
      });
  }
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  toggleConfirmPassword() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  getDirtyValues(form: FormGroup): { [key: string]: any } {
    const dirtyValues: { [key: string]: any } = {};
    Object.keys(form.controls).forEach((key) => {
      const currentControl = form.get(key);
      if (currentControl && currentControl.dirty) {
        dirtyValues[key] = currentControl.value;
      }
    });
    return dirtyValues;
  }

  chooseAvatar() {
    document.getElementById('chooseAvatar')?.click();
  }

  selectAvatar(event: any) {
    this._gs.uploadImage(event.target.files[0]).subscribe({
      next: (res) => {
        this._gs
          .updateProfile({
            avatar: res.data.image,
          })
          .subscribe({
            next: () => {
              this.notify.success('Avatar uploaded successfully');
            },
          });
      },
    });
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
  ngOnInit(): void {}
}
