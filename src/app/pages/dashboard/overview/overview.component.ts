import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  wantsToPlay: boolean = false;
  winners = [
    {
      number: 4,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
    {
      number: 5,
      name: 'Izzytheguy',
      time: '1 mins ago',
      point: '866',
    },
    {
      number: 6,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
    {
      number: 7,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
    {
      number: 9,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
    {
      number: 4,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
    {
      number: 5,
      name: 'Izzytheguy',
      time: '1 mins ago',
      point: '866',
    },
    {
      number: 6,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
    {
      number: 7,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
    {
      number: 9,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
    {
      number: 4,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
    {
      number: 5,
      name: 'Izzytheguy',
      time: '1 mins ago',
      point: '866',
    },
    {
      number: 6,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
    {
      number: 7,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
    {
      number: 9,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
    {
      number: 7,
      name: 'Izzytheguy',
      time: '10 mins ago',
      point: '866',
    },
  ];

  constructor(private route: Router) {}

  play() {
    this.wantsToPlay = true;
  }

  onAdDismissed(event: any) {
    this.wantsToPlay = false;
    this.route.navigate(['/dashboard/game']);
  }
}
