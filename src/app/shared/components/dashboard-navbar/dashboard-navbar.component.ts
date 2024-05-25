import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store/app.states';
import { selectUser } from '../../../store/selectors/auth.selectors';
import { IUserData } from '../../../core/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrl: './dashboard-navbar.component.scss',
})
export class DashboardNavbarComponent implements OnInit {
  user$: Observable<IUserData | null>;
  constructor(private router: Router, private store: Store<AppState>) {
    this.user$ = this.store.pipe(select(selectUser));
  }
  ngOnInit(): void {
    
  }

  checkIfInRoute(routePath: string): boolean {
    return this.router.url === routePath;
  }
}
