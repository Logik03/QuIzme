import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';
export interface Interest {
  name: string;
  selected: boolean;
}
@Component({
  selector: 'app-interest-component',
  templateUrl: './interest-component.component.html',
  styleUrl: './interest-component.component.scss'
})
export class InterestComponentComponent {

  constructor(private notification: NotificationService,) {}

  @Input() interests: Interest[] = [];
  @Output() selectionChange = new EventEmitter<Interest[]>();

  toggleSelection(interest: Interest) {
    const selectedCount = this.interests.filter(i => i.selected).length;

    if (!interest.selected && selectedCount >= 10) {
      this.notification.error('You can select up to 10 interests only');
    } else {
      interest.selected = !interest.selected;
    }
  }

  continue() {
    const selectedInterests = this.interests.filter(interest => interest.selected);
    this.selectionChange.emit(selectedInterests);
  }
}