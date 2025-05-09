import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../../core/models/game';

@Component({
  selector: 'app-top-three',
  templateUrl: './top-three.component.html',
  styleUrl: './top-three.component.scss'
})
export class TopThreeComponent implements OnInit  {
  @Input() top3Players: Player[] = [];

  constructor() {}
  
  ngOnInit() {
    
  }

}
