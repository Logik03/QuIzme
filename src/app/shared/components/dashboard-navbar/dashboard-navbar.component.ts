import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrl: './dashboard-navbar.component.scss',
})
export class DashboardNavbarComponent {
  constructor(private router: Router) {
  }

  checkIfInRoute(routePath: string): boolean {
    return this.router.url === routePath;
  }
}
