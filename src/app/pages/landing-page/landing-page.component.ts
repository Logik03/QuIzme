import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  isSticky = false;

  @HostListener('window:scroll', [])
  checkScroll() {
    const scrollPosition = window.pageYOffset;
    this.isSticky = scrollPosition >= 100; 
  }
}
