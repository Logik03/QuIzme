import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../store/app.states';
import { selectEmail } from '../../../store/selectors/auth.selectors';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.scss'
})
export class EmailVerificationComponent implements OnInit {
  email$: any;
  
  constructor(private store: Store<AppState>) {}
  
  ngOnInit(): void {
    this.email$ = this.store.pipe(select(selectEmail));
  }

}
