import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss'],
})
export class AdsComponent implements OnInit {
  @ViewChild('content', { static: true }) content: any;
  @Output() adDismissed = new EventEmitter<string>();
  @Input() playerChances!: number;
  @Input() gameState!: any;
  @Input() adType!: string;
  dashOffset = 0;
  canSkip = false;
  countdown = 30;
  circumference!: number;
  radius: number = 25;
  private modalRef!: NgbModalRef;
  private countdownInterval: any;
  responseReceived = false;

  constructor(private modalService: NgbModal, private router : Router) {}

  ngOnInit(): void {
    this.openAdModal();
    this.circumference = 2 * Math.PI * this.radius;
    this.dashOffset = this.calculateDashOffset();
  }

  openAdModal(): void {
    this.modalRef = this.modalService.open(this.content, {
      backdrop: 'static',
      keyboard: false,
    });

    this.startCountdown();
  }

  /* startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      //this.dashOffset = this.calculateDashOffset();
      if (this.countdown < 15) {
        this.canSkip = true;
      } else if (this.countdown === 0) {
        clearInterval(this.countdownInterval); // Clear the interval when countdown reaches 0
        this.countdown = 0; 
      }
    }, 1000); // Update every second
  } */

  startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      this.dashOffset = this.calculateDashOffset(); // Update dashOffset continuously

      switch (true) {
        case (this.countdown <= 0):
          clearInterval(this.countdownInterval); // Clear the interval when countdown reaches 0
          this.countdown = 0; // Ensure countdown doesn't go below 0
          break;
        case (this.countdown < 15):
          this.canSkip = true;
          break;
        default:
          // Other cases or default actions if any
          break;
      }
    }, 1000); // Update every second
}

  skipAd(modal: NgbModalRef): void {
    if (this.canSkip) {
      this.closeAd('skipped');
    }
  }

  close(reason: string) {
      this.modalRef.close();
      this.adDismissed.emit(reason);
  }

  closeAd(reason: string): void {
    if (this.modalRef) {
      this.modalRef.close();
      clearInterval(this.countdownInterval);
      this.adDismissed.emit(reason);
    }
  }
  calculateDashOffset(): number {
    const progress = this.countdown / 30;
    return this.circumference * (1 - progress);
  }
  claimReward() {
    // dispatch a claim reward action
    this.closeAd('reward');
    //this.router.navigate(['/dashboard'], { replaceUrl: true });
  }
  viewScore(): void {
    // Handle the logic for viewing the score
    this.closeAd('Viewed Score');
    // Navigate to the score view or perform another action
  }
  
}
