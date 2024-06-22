import { Component, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-score',
  templateUrl: './view-score.component.html',
  styleUrl: './view-score.component.scss'
})
export class ViewScoreComponent {
  playerScore: number = 0; // Replace with actual player's score

  constructor(public activeModal: NgbActiveModal) {}

  close() {
    this.activeModal.dismiss('Cross click');
  }

}
