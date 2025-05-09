import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../../core/models/game';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-top-ten',
  templateUrl: './top-ten.component.html',
  styleUrl: './top-ten.component.scss'
})
export class TopTenComponent implements OnInit  {
  
  @Input() winners : Player[] = [];
  @Input()  player_history: Player[] = [];
  active!: 1;

  constructor() {}
  
  
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
