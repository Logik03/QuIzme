import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  isSticky = false;

  constructor(private router:Router) {

  }

  goToLogin() {
    this.router.navigateByUrl('/auth/login');
  }

  @HostListener('window:scroll', [])
  checkScroll() {
    const scrollPosition = window.pageYOffset;
    this.isSticky = scrollPosition >= 100; 
  }
}
