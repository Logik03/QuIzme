import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss'],
})
export class AdsComponent implements OnInit {
  @ViewChild('content', { static: true }) content: any;
  @Output() adDismissed = new EventEmitter<void>();
  @Input() playerChances!: number;

  canSkip = false;
  countdown = 30;
  private modalRef!: NgbModalRef;
  private countdownInterval: any;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.openAdModal();
  }

  openAdModal(): void {
    this.modalRef = this.modalService.open(this.content, {
      backdrop: 'static',
      keyboard: false,
    });

    this.startCountdown();
  }

  startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown < 15) {
        this.canSkip = true;
      } else if (this.countdown === 0) {
        this.closeAd();
      }
    }, 1000); // Update every second
  }

  skipAd(modal: NgbModalRef): void {
    if (this.canSkip) {
      this.closeAd();
    }
  }

  closeAd(): void {
    if (this.modalRef) {
      this.modalRef.close();
      clearInterval(this.countdownInterval);
      this.adDismissed.emit();
    }
  }
}
